FROM shyal/node-sailsjs:6.5.0-slim

ADD . /code
WORKDIR /code


EXPOSE 1343

RUN npm install
CMD bash run.sh
