'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Evidence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Evidence.init({
    fine_ID: DataTypes.INTEGER,
    evi_link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Evidence',
  });
  return Evidence;
};