#!/usr/bin/env python3
import os
from docker import Client
from git import Repo
import boto3
import argparse
import subprocess


cli = Client(base_url='unix://var/run/docker.sock')
ecs = boto3.client(
    'ecs',
    aws_access_key_id='AKIAJFKJMCZC3VNDMSIA',
    aws_secret_access_key='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'
)

full_path = os.path.dirname(os.path.realpath(__file__))
projectname = "/".join(full_path.split('/').pop().split('_'))


repo = Repo(full_path)
git = repo.git

parser = argparse.ArgumentParser()

parser.add_argument("-b", "--branch", help="Branch name")
parser.add_argument("-t", "--tag", help="Docker tag")
parser.add_argument("-e", "--env", help="Envioment")

args = parser.parse_args()
branch = args.branch if args.branch else 'master'
tag = args.tag if args.tag else branch
env = args.env if args.env else 'production'
print(tag)
######################
#--------> Git Stage
######################

print("→ Checkout to {}".format(branch))
response = git.checkout(branch)
print(response)

print("→ Pull {}".format(branch))
response = git.pull()
print(response)


# ######################
# #--------> Docker Stage
# ######################


# → AWS ECR Login
print("→ AWS ECR Login ")
proc = subprocess.Popen(
    ["aws ecr get-login --region eu-west-1"], stdout=subprocess.PIPE, shell=True)
(out, err) = proc.communicate()
token = out.decode('UTF-8').split('-p ')[1].split(' ')[0]
remote = 'https://' + out.decode('UTF-8').split('https://')[1].strip()


# → Docker Login
print("→ Docker Login ")
response = cli.login(
    username='AWS',
    password=token,
    registry=remote
)
print(response)


# → Docker Build
print("→ Docker Build ")
response = cli.build(
    path='.',
    rm=True,
    tag="{}:{}".format(projectname, tag),
    decode=True
)

for line in response:
    print(line.get('stream'))

# → Docker Tag
print("→ Docker Tag ")
response = cli.tag(
    image="{}:{}".format(projectname, tag),
    repository="315671387076.dkr.ecr.eu-west-1.amazonaws.com/{}".format(
        projectname),
    tag=tag
)
print(response)


# → Docker Push
print("→ Docker Push ")
response = cli.push(
    repository="315671387076.dkr.ecr.eu-west-1.amazonaws.com/{}".format(
        projectname),
    tag=tag,
    stream=True
)
for line in response:
    print(line.decode('UTF-8'))

# → Docker Remove
print("→ Docker Remove ")

response = cli.remove_image(
    image="315671387076.dkr.ecr.eu-west-1.amazonaws.com/{}:{}".format(
        projectname, tag),
    force=True
)
response = cli.remove_image(
    image="{}:{}".format(
        projectname, tag),
    force=True
)
