// const fs = require('fs');
// const path = require('path');
const Sequelize = require('sequelize');
const cls = require('cls-hooked');
const Promise = require('bluebird');
const clsBluebird = require('cls-bluebird');

const namespace = cls.createNamespace('cls-pg-bwl');
clsBluebird(namespace, Promise);
Sequelize.useCLS(namespace);

// const env = process.env.NODE_ENV || 'development';
let models = {};

const database = process.env.POSTGRES_DATABASE || 'diary';
const username = process.env.POSTGRES_DATABASE || 'postgres';
const password = process.env.POSTGRES_DATABASE || 'postgres';

const bdConfig = {
  host: 'postgres',
  port: 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: false,
    // ssl: true,
  },
  freezeTableName: true,
  define: { timestamps: false },
  pool: {
    maxConnections: 10,
    minConnections: 0,
    maxIdleTime: 60,
  },
};

const sequelize = new Sequelize(database, username, password, bdConfig);

/*
const basename = path.basename(__filename);
fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    models[model.name] = model;
    console.log('models--------->', models);
  });
*/


// todo: think about automatizate
models = {
  NoteModel: sequelize.import('./Note/NoteModel'),
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
