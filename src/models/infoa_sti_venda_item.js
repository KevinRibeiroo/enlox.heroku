import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class infoa_sti_venda_item extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_venda_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_venda: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_produto: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    qtd_produto: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'infoa_sti_venda_item',
    timestamps: false
  });
  return infoa_sti_venda_item;
  }
}
