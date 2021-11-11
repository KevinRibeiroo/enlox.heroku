import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class infob_amz_tbreporte_denuncia extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_reporte_denuncia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_denuncia: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    dt_reporte: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ds_motivo_reporte: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ds_confirmado: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'infob_amz_tbreporte_denuncia',
    timestamps: false
  });
  return infob_amz_tbreporte_denuncia;
  }
}
