import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class infod_ssc_item extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_item: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_produto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'infod_ssc_produto',
        key: 'id_produto'
      }
    },
    qtd_produto: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    vl_item: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'infod_ssc_item',
    timestamps: false
  });
  return infod_ssc_item;
  }
}
