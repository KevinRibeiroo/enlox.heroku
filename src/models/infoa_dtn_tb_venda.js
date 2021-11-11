import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class infoa_dtn_tb_venda extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_venda: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'infoa_dtn_tb_cliente',
        key: 'id_cliente'
      }
    },
    tp_pagamento: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    dt_venda: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    id_venda_item: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'infoa_dtn_tb_venda_item',
        key: 'id_venda_item'
      }
    }
  }, {
    sequelize,
    tableName: 'infoa_dtn_tb_venda',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_venda" },
        ]
      },
      {
        name: "id_cliente",
        using: "BTREE",
        fields: [
          { name: "id_cliente" },
        ]
      },
      {
        name: "id_venda_item",
        using: "BTREE",
        fields: [
          { name: "id_venda_item" },
        ]
      },
    ]
  });
  return infoa_dtn_tb_venda;
  }
}
