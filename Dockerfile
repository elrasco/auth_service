FROM shyal/node-sailsjs:latest

ADD . /code
WORKDIR /code


EXPOSE 1343

RUN npm install
CMD node app.js
