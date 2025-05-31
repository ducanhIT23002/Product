import { DataTypes } from 'sequelize';
import sequelize from '../config/database'; // Cập nhật đường dẫn phù hợp với project của bạn

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  code: {
    type: DataTypes.STRING,
  },
  userID: {
    type: DataTypes.INTEGER,
  },
  fullName: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  note: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue : "active"
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull : true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue : DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue : DataTypes.NOW
  },
}, {
  tableName: "cart",
  timestamps: true
});
export default Cart



