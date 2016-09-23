const { dev, stage, prod } = require('smallfish_config').common.rdb;

module.exports.connections = {

  localDiskDb: {
    adapter: 'sails-disk'
  },

  smallfish_auth_dev: {
    user: dev.user,
    password: dev.password,
    database: 'smallfish_auth',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 1,
      idle: 10000
    },
    options: {
      dialect: 'mysql',
      host: dev.host,
      logging: true
    }
  },

  smallfish_auth_stage: {
    user: stage.user,
    password: stage.password,
    database: 'smallfish_auth',
    dialect: 'mysql',
    pool: {
      max: 15,
      min: 5,
      idle: 10000
    },
    options: {
      dialect: 'mysql',
      host: stage.host,
      logging: false
    }
  },
  smallfish_auth: {
    user: prod.user,
    password: prod.password,
    database: 'smallfish_auth',
    dialect: 'mysql',
    pool: {
      max: 15,
      min: 5,
      idle: 10000
    },
    options: {
      dialect: 'mysql',
      host: prod.host,
      logging: true
    }
  }

};
