import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class infoc_tht_compra extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_compra: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_pacote: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ds_aprovacao: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    dt_compra: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'infoc_tht_compra',
    timestamps: false
  });
  return infoc_tht_compra;
  }
}
