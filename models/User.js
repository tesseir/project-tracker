const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User extends Model {
  checkPassword(loginPw) {
    console.log(` @check password (input) ${loginPw}`);
    console.log(` @check password (existing) ${this.password}`);

    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      async beforeCreate(newUserData) {
        console.log(` before create hook, unhashed ${newUserData}`);
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        console.log(` before create hook, hashed password ${newUserData}`);
        return newUserData;
      },
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "User",
  }
);
console.log(`User model connection =`)
console.log( User=== sequelize.models.User)
module.exports = User;
