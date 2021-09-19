const User = require('./User');
const Publication = require('./Publication');
const express = require('express');

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('socialnetwork', 'P6user', 'P6user', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

const Comment = sequelize.define('comment', {
  id: { type: Sequelize.SMALLINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  user_id: { type: Sequelize.SMALLINT.UNSIGNED, references: { model: User, key: 'id' } },
  publication_id: { type: Sequelize.SMALLINT.UNSIGNED, references: { model: Publication, key: 'id' }, allowNull:false },
  commentContent:  { type: Sequelize.TEXT, allowNull: false },  
},
{tableName: 'Comments', timestamps: false}
);


async() => {
    await Comment.sync({ alter: true });
  }
  
  module.exports = Comment;