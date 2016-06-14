FROM node:latest

RUN cd $(npm root -g)/npm \
&& npm install fs-extra \
&& sed -i -e s/graceful-fs/fs-extra/ -e s/fs.rename/fs.move/ ./lib/utils/rename.js

ADD . /code
WORKDIR /code
RUN npm install -g sails
EXPOSE 1339

RUN npm install
CMD node app.js
