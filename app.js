const express = require('express');
const app = express();
const path = require('path');

const userRoutes = require('./routes/user');
const publicationRoutes= require('./routes/publication');
const commentRoutes= require('./routes/comment');


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });



const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('socialnetwork', 'P6user', 'P6user', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
}); 

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/publications', publicationRoutes);
app.use('/api/publications/:id/comments', commentRoutes);



module.exports = app;