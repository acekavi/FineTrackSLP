'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IfDriver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  IfDriver.init({
    fine_ID: DataTypes.INTEGER,
    vehicle: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'IfDriver',
  });
  return IfDriver;
};