const express = require('express');
const app = express();
const path = require('path');

const userRoutes = require('./routes/user');
const publicationRoutes= require('./routes/publication');


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



/*const Publication = sequelize.define('publication', {
  id: { type: Sequelize.SMALLINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  user_id: { type: Sequelize.SMALLINT.UNSIGNED, references: { model: User, key: 'id' } },
  title: { type: Sequelize.STRING(50), allowNull: false },
  content: { type: Sequelize.TEXT, allowNull: false },
  image: {  type: Sequelize.BLOB, allowNull:true },
  likes: { type: Sequelize.SMALLINT, allowNull: true},
},
{tableName: 'Publications', timestamps: false, underscored: true}
);

Publication.sync({ force: true });*/

/*const Comment = sequelize.define('comment', {
  id: { type: Sequelize.SMALLINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  user_id: { type: Sequelize.SMALLINT.UNSIGNED, references: { model: User, key: 'id' } },
  publication_id: { type: Sequelize.SMALLINT.UNSIGNED, references: { model: Publication, key: 'id' }, allowNull:false },
  commentContent:  { type: Sequelize.TEXT, allowNull: false }  
});*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/publications', publicationRoutes);



module.exports = app;