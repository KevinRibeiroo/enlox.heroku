import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class infoa_dtb_tb_venda_item extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    ID_VENDA_ITEM: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ID_CLIENTE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ID_LIVRO: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'infoa_dtb_tb_venda_item',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_VENDA_ITEM" },
        ]
      },
      {
        name: "ID_CLIENTE",
        using: "BTREE",
        fields: [
          { name: "ID_CLIENTE" },
        ]
      },
      {
        name: "ID_LIVRO",
        using: "BTREE",
        fields: [
          { name: "ID_LIVRO" },
        ]
      },
    ]
  });
  return infoa_dtb_tb_venda_item;
  }
}
