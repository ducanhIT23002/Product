import { DataTypes } from 'sequelize';
import sequelize from '../config/database'; // Cập nhật đường dẫn phù hợp với project của bạn

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  discountPercentage: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tags: {
    type: DataTypes.JSON,  // Dùng JSONB nếu bạn dùng PostgreSQL, hoặc JSON nếu dùng MySQL
    allowNull: true
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: true
  },
  thumbnail: {
    type: DataTypes.TEXT,
    allowNull: true
  }
//   createAt: {
//     type: DataTypes.DATE,
//     allowNull: false,
//     defaultValue: DataTypes.NOW
//   },
//   updateAt: {
//     type: DataTypes.DATE,
//     allowNull: false,
//     defaultValue: DataTypes.NOW
//   }
}, {
  tableName: "products",
  timestamps: false
//   createdAt: "createAt",
//   updatedAt: "updateAt"
});

export default Product;
