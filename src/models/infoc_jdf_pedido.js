import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class infoc_jdf_pedido extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_pedido: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'infoc_jdf_cliente',
        key: 'id_cliente'
      }
    },
    ds_formaPagamento: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ds_status: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'infoc_jdf_pedido',
    timestamps: false
  });
  return infoc_jdf_pedido;
  }
}
