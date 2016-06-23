node() {
  // stage 'Pull branch'
  //   sh('git rev-parse --abbrev-ref HEAD > GIT_BRANCH')
  //   def git_branch=readFile('GIT_BRANCH')
  //   git branch: git_branch, credentialsId: 'bitbucket', url: 'git@bitbucket.org:_smallfish/smallfish_auth.git'

  stage 'Build Docker Image'
    sh 'docker build --no-cache -t smallfish/auth .'

  stage 'Push Docker Image to ECR'
  	// ENVS
    // sh('git rev-parse HEAD > GIT_COMMIT')
    // def git_commit=readFile('GIT_COMMIT')
    sh('git rev-parse --abbrev-ref HEAD > GIT_BRANCH')
    def git_branch=readFile('GIT_BRANCH')
    // PUSH
    sh "docker tag smallfish/auth:latest 315671387076.dkr.ecr.eu-west-1.amazonaws.com/smallfish/auth:${git_branch}"
    sh "docker push 315671387076.dkr.ecr.eu-west-1.amazonaws.com/smallfish/auth:${git_branch}"

}
