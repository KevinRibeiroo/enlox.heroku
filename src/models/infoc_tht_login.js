import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class infoc_tht_login extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_login: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_cadastro: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ds_email: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    ds_senha: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'infoc_tht_login',
    timestamps: false
  });
  return infoc_tht_login;
  }
}
