const User = require('../models/User'); 
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../connexion');


//Je crée le modèle Publication dans ma database
const Publication = sequelize.define('publication', {
  id: { type: Sequelize.SMALLINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  user_id: { type: Sequelize.SMALLINT.UNSIGNED, allowNull: false },
  content: { type: Sequelize.TEXT, allowNull: false },
  image: {  type: Sequelize.STRING, allowNull:false },
  likes: { type: Sequelize.SMALLINT, allowNull: false, defaultValue: 0 },
  usersLiked: { type: Sequelize.STRING, allowNull: true }
},
{tableName: 'Publications', timestamps: true, underscored: true}
);

User.hasMany(Publication, {foreignKey: 'user_id'}, {onDelete: 'CASCADE'});
Publication.belongsTo(User, {foreignKey: 'user_id'});



async() => {
  await Publication.sync({ alter: true });
}

module.exports = Publication; 