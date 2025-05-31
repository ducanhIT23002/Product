import UserAmin from "../../model/user-admin.model";
import Role from "../../model/roles.model";
import { Request, Response, NextFunction } from "express";

export const roleCheck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            res.json({ message: 'Thiếu token hoặc token không hợp lệ' });
            return
        }
        const token = authHeader.split(' ')[1];

        const action = req.body.action_type
        if (!action) {
            res.json({
                error: true,
                message: "Thiếu thông tin hành động (action)"
            });
            return
        }

        const user = await UserAmin.findOne({
            where: { token: token },
            raw: true
        })

        if (!user) {
            res.json({
                error: true,
                message: "không tìm thấy user này"
            })
            return
        }

        const role = await Role.findOne({
            where: { id: user["role_id"] },
            raw: true
        })

        if (!role) {
            res.json({
                error: true,
                message: "bạn chưa được phân quyền"
            })
            return
        }
        const arrayPermission = role["permissions"].split(",")
        const check = arrayPermission.find(right => right === action)

        if (!check) {
            res.json({
                error: true,
                message: "bạn không có quyền sử dụng tính năng này"
            })
            return
        }

        next()
    } catch (error) {
        console.error(error);
        res.json({
            error: true,
            message: "Lỗi máy chủ"
        });
        return
    }
}
