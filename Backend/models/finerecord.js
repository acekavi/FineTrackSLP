'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FineRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FineRecord.init({
    fine_ID: DataTypes.INTEGER,
    ID: DataTypes.STRING,
    total_fine: DataTypes.DECIMAL,
    total_score: DataTypes.DECIMAL,
    fine_date: DataTypes.DATE,
    fine_time: DataTypes.TIME,
    location_name: DataTypes.STRING,
    location_link: DataTypes.STRING,
    isDriver: DataTypes.BOOLEAN,
    officer_ID: DataTypes.INTEGER,
    is_payed: DataTypes.BOOLEAN,
    pay_reference_id: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'FineRecord',
  });
  return FineRecord;
};