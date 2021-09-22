const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../connexion');


//Je crée le modèle User dans ma database
const User = sequelize.define('user', {
    id: { type: Sequelize.SMALLINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    first_name: { type: Sequelize.STRING(35), allowNull: false, },
    last_name: { type: Sequelize.STRING(35), allowNull: false, },
    email: { type: Sequelize.STRING(35), allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false, },
    gender: { type: Sequelize.STRING(1), allowNull:true },
    birthday: { type: Sequelize.DATEONLY, allowNull:true },
    occupation: { type: Sequelize.STRING(35), allowNull:true },
    about: { type: Sequelize.STRING(250), allowNull:true },
    profilePicture: { type: Sequelize.STRING, allowNull:true},
    admin: { type: Sequelize.BOOLEAN, allowNull:false, defaultValue:false }
  },
        {tableName: 'Users', timestamps: true}
  );

async() => {
    await User.sync({ alter: true });
}

module.exports = User;



