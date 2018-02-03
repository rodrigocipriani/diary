/*
const path = require('path');
const fs = require('fs');
const cls = require('cls-hooked');
const Sequelize = require('sequelize');
const Promise = require('bluebird');
const clsBluebird = require('cls-bluebird');

const namespace = cls.createNamespace('cls-pg-bwl');
clsBluebird(namespace, Promise);
Sequelize.useCLS(namespace);
let sequelize = null;
let modelo = null;

const basename = path.basename(__filename);

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

console.log('1 ##########################');

module.exports = () => {
  if (!modelo) {
    console.log('2 ##########################');
    console.log('Inicializa modelos do pg'); // eslint-disable no-console
    if (!sequelize) {
      console.log('-> instancia sequelize com cls'); // eslint-disable no-console
      sequelize = new Sequelize(
        database,
        username,
        password,
        bdConfig,
      );
    }
    const db = {};

    fs.readdirSync(__dirname)
      .filter(file => file.indexOf('.') !== 0 && file !== basename && file !== 'auto')
      .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
      });

    Object.keys(db).forEach((model) => {
      if ('associate' in db[model]) {
        db[model].associate(db);
      }
    });

    db.Sequelize = Sequelize;
    db.sequelize = sequelize;
    modelo = db;
  }
  return modelo;
};
*/

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const cls = require('cls-hooked');
const Promise = require('bluebird');
const clsBluebird = require('cls-bluebird');

const namespace = cls.createNamespace('cls-pg-bwl');
clsBluebird(namespace, Promise);
Sequelize.useCLS(namespace);

const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
const models = {};

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

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    models[model.name] = model;
    console.log('models--------->', models);
  });

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
