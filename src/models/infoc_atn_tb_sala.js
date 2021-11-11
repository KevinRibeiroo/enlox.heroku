import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class infoc_atn_tb_sala extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_sala: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nm_sala: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    bt_ativa: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    id_empresa: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_pessoal: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'infoc_atn_tb_sala',
    timestamps: false
  });
  return infoc_atn_tb_sala;
  }
}
