const express = require('express');
const app = express();
const path = require('path');

const userRoutes = require('./routes/user');
const publicationRoutes= require('./routes/publication');
const commentRoutes= require('./routes/comment');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const cors = require('cors');
var crypto = require('crypto');
var uuid = require('node-uuid');
const sequelize = require('./connexion');
var session = require("express-session");

// initalize sequelize with session store
var SequelizeStore = require("connect-session-sequelize")(session.Store);


const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true,

}
app.use(cors(corsOptions));

app.use((req, res, next) => {    
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


var myStore = new SequelizeStore({
  db: sequelize,
});

myStore.sync({alter:true});

app.set('trust proxy', 1)

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
  /*genid:function(req){
    //return crypto.createHash('sha256').update(uuid.v1()).update(crypto.randomBytes(1)).digest("hex");
    return Math.random() * (Math.random()*10)
  },*/
  store: myStore,
  secret: 'keyboard cat',
  saveUninitialized:false,
  cookie: { maxAge: oneDay, /*httpOnly:true,*/ sameSite:false, secure:false },
  resave: false, 
  name : 'hello',
}));


// Secret à passer en dotenv, name à passer en dotenv, hash à passer en dotenv





  app.use(express.json());
app.use(express.urlencoded({ extended:true }));



app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/publications', publicationRoutes);
app.use('/api/publications/:id/comments', commentRoutes);


module.exports = app;