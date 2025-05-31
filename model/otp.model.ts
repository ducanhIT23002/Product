import { DataTypes } from 'sequelize';
import sequelize from '../config/database'; // Cập nhật đường dẫn phù hợp với project của bạn

const Otp = sequelize.define("Otp", {
    otp: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true // Đánh dấu otp là khóa chính
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    tableName: "otp",
    timestamps: false,
});

export default Otp;