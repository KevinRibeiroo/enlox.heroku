import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class infoc_tdv_pedido_item extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_pedido_item: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_pedido: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'infoc_tdv_pedido',
        key: 'id_pedido'
      }
    },
    qtd_itens: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_livro: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'infoc_tdv_livro',
        key: 'id_livro'
      }
    }
  }, {
    sequelize,
    tableName: 'infoc_tdv_pedido_item',
    timestamps: false
  });
  return infoc_tdv_pedido_item;
  }
}
