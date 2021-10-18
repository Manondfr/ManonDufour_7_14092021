const dotenv = require('dotenv');
dotenv.config();
const EXPRESS_SESSION_SECRET = process.env.EXPRESS_SESSION_SECRET;
const EXPRESS_SESSION_NAME = process.env.EXPRESS_SESSION_NAME;

const express = require('express');
const helmet = require("helmet");
const app = express();
const path = require('path');

const sessions = require('express-session');
const cors = require('cors');
const sequelize = require('./connexion');
const SequelizeStore = require("connect-session-sequelize")(sessions.Store);

const userRoutes = require('./routes/user');
const publicationRoutes= require('./routes/publication');
const commentRoutes= require('./routes/comment');

app.use(helmet());

// Options CORS
const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true,
}

app.use(cors(corsOptions));

app.use((req, res, next) => {    
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


// Mise en place persistence session - Connexion à la database et utilisation express-session
const myStore = new SequelizeStore({
  db: sequelize,
});

app.set('trust proxy', 1)

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
  store: myStore,
  secret: EXPRESS_SESSION_SECRET,
  saveUninitialized:false,
  cookie: { maxAge: oneDay, httpOnly:true, sameSite:true, secure:false },
  resave: false, 
  name : EXPRESS_SESSION_NAME,
}));

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/publications', publicationRoutes);
app.use('/api/publications/:id/comments', commentRoutes);

module.exports = app;