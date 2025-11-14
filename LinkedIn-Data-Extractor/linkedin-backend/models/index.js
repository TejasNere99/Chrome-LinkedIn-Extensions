const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite'
});

const Profile = sequelize.define('Profile', {
  name: { type: DataTypes.STRING },
  url: { type: DataTypes.STRING },
  about: { type: DataTypes.TEXT },
  bio: { type: DataTypes.TEXT },
  location: { type: DataTypes.STRING },
  followerCount: { type: DataTypes.STRING },
  connectionCount: { type: DataTypes.STRING },
  bioLine: { type: DataTypes.STRING }
}, {});

module.exports = { sequelize, Profile };
