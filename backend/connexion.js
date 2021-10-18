const DB_NAME = process.env.DATABASE_NAME;
const DB_USERNAME = process.env.DATABASE_USERNAME;
const DB_PASSWORD = process.env.DATABASE_PASSWORD;
const DB_HOST = process.env.DATABASE_HOST;

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    logging: false,
    storage: "./session.mysql",
}); 

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;