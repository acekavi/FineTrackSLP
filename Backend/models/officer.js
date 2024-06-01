'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Officer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Officer.init({
    officer_ID: DataTypes.INTEGER,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    station_ID: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Officer',
  });
  return Officer;
};