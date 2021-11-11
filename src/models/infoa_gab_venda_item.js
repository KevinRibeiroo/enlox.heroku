import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class infoa_gab_venda_item extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_venda_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_produto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_venda: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    qtd_produtos: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    vl_preco: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'infoa_gab_venda_item',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_venda_item" },
        ]
      },
      {
        name: "id_produto",
        using: "BTREE",
        fields: [
          { name: "id_produto" },
        ]
      },
      {
        name: "id_venda",
        using: "BTREE",
        fields: [
          { name: "id_venda" },
        ]
      },
    ]
  });
  return infoa_gab_venda_item;
  }
}
