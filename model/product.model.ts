import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  title: { type: DataTypes.STRING(255), allowNull: false },
  image: { type: DataTypes.STRING(500), allowNull: true },
  description: { type: DataTypes.STRING(4000), allowNull: true },
  price: { type: DataTypes.INTEGER, allowNull: true },
  position: { type: DataTypes.INTEGER, allowNull: false },
  discount: { type: DataTypes.TINYINT, allowNull: true },
  stock: { type: DataTypes.INTEGER, allowNull: true },
  slug: { type: DataTypes.STRING(255), allowNull: false },
  status: { type: DataTypes.STRING(20), allowNull: false, defaultValue : "active" },
  deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
  deletedAt: { type: DataTypes.DATE, allowNull: true },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  idCategory: { type: DataTypes.INTEGER }
}, {
  tableName: 'products',
  timestamps: false
});

export default Product;