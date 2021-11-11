import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class infoa_dtn_tb_tamanhos extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_tamanho: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    sequelize,
    tableName: 'infoa_dtn_tb_tamanhos',
    timestamps: false
  });
  return infoa_dtn_tb_tamanhos;
  }
}
