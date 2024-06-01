'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Offence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Offence.init({
    offence_ID: DataTypes.INTEGER,
    offence_description: DataTypes.TEXT,
    score: DataTypes.DECIMAL,
    enable_stat: DataTypes.BOOLEAN,
    fee: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Offence',
  });
  return Offence;
};