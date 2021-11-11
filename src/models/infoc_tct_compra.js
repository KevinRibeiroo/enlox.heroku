import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class infoc_tct_compra extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_compra: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_endereco: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ds_nota_fiscal: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ds_forma_pagamento: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    vl_total: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    bt_aprovada: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'infoc_tct_compra',
    timestamps: false
  });
  return infoc_tct_compra;
  }
}
