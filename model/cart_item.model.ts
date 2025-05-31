import { DataTypes } from 'sequelize';
import sequelize from '../config/database'; // Cập nhật đường dẫn phù hợp với project của bạn

const CartItem = sequelize.define('CartItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: false,
  },
  discount: {
    type: DataTypes.INTEGER,
    allowNull : true
  },
  timeStart : {
    type: DataTypes.DATE,
    allowNull: true,
  }
},{
    tableName : "cartitem",
    timestamps : false
});

export default CartItem