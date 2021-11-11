import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class infoa_enl_visto_recentemente extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_visto_recentemente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_produto: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    dt_visualizacao: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'infoa_enl_visto_recentemente',
    timestamps: false
  });
  return infoa_enl_visto_recentemente;
  }
}
