const User = require('../models/User');

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('socialnetwork', 'P6user', 'P6user', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
}); 

const Publication = sequelize.define('publication', {
  id: { type: Sequelize.SMALLINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  user_id: { type: Sequelize.SMALLINT.UNSIGNED, allowNull: false, references: { model: User, key: 'id' } },
  title: { type: Sequelize.STRING(50), allowNull: false },
  content: { type: Sequelize.TEXT, allowNull: false },
  image: {  type: Sequelize.STRING, allowNull:false },
  likes: { type: Sequelize.SMALLINT, allowNull: true},
},
{tableName: 'Publications', timestamps: false, underscored: true}
);

Publication.sync({force:true});

/*async() => {
  await Publication.sync({ alter: true });
}*/

module.exports = Publication;