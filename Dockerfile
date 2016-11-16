FROM shyal/docker-node-yarn

ADD . /code
WORKDIR /code


EXPOSE 1343

RUN yarn install --no-lockfile
CMD bash run.sh
