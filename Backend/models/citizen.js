'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Citizen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Citizen.init({
    ID: DataTypes.STRING,
    mobile: DataTypes.INTEGER,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    earned_score: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Citizen',
  });
  return Citizen;
};