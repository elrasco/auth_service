FROM shyal/node-sailsjs:latest

ADD . /code
WORKDIR /code


EXPOSE 1339

RUN npm install
CMD node app.js
