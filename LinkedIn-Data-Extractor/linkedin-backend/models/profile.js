import { DataTypes } from "sequelize";
import sequelize from "./index.js";

const Profile = sequelize.define("Profile", {
  name: DataTypes.STRING,
  url: DataTypes.STRING,
  about: DataTypes.TEXT,
  bio: DataTypes.TEXT,
  location: DataTypes.STRING,
  followers: DataTypes.INTEGER,
  connections: DataTypes.INTEGER,
});

export default Profile;
