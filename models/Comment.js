const User = require('./User');
const Publication = require('./Publication');
const { Sequelize } = require('sequelize');
const sequelize = require('../connexion');


// Je crée le modèle Comment dans ma Database
const Comment = sequelize.define('comment', {
  id: { type: Sequelize.SMALLINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  user_id: { type: Sequelize.SMALLINT.UNSIGNED },
  publication_id: { type: Sequelize.SMALLINT.UNSIGNED, allowNull:false },
  commentContent:  { type: Sequelize.TEXT, allowNull: false },  
},
{tableName: 'Comments', timestamps: false}
);

User.hasMany(Comment, { foreignKey: 'user_id' }, {onDelete: 'CASCADE'});
Publication.hasMany(Comment, { foreignKey: 'publication_id' }, {onDelete: 'CASCADE'});
Comment.belongsTo(User, {foreignKey: 'user_id'});


async() => {
    await Comment.sync({ alter: true });
}
  
module.exports = Comment;