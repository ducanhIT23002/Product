import User from "../../model/user.model";
import UserAmin from "../../model/user-admin.model";
import { Request, Response, NextFunction } from "express";

export const authToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    if (token) {
        const user = await User.findOne({
            where: {
                tokenUser: token,
                deleted: false
            },
            attributes: { exclude: ['password'] },
            raw: true
        })
        if (!user) {
            const Admin = await UserAmin.findOne({
                where: {
                    token: token,
                    deleted: false
                },
                attributes: { exclude: ['password'] },
                raw: true
            })
            if (Admin) {
                next();
                return
            }

            res.json({
                error: false,
                message: "Token khonh hop le"
            })
            return
        }
        req["user"] = user
        next();
    } else {
        res.json({
            error: false,
            message: "vui long gui Token"
        })
    }
}
