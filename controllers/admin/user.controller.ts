import { Request, Response } from 'express';
import UserAmin from '../../model/user-admin.model';
import { createTokenUser } from '../../helpers/createToken';

export const getUser = async (req: Request, res: Response) => {
    const newAccount = await UserAmin.findAll({
        where: {
            deleted: false,
        },
        raw: true
    })
    res.json(newAccount)
};

export const getOneUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const newAccount = await UserAmin.findOne({
            where: {
                deleted: false,
                id: id
            },
            raw: true
        })
        res.json(newAccount)
    } catch (error) {
        console.log(error)
        res.json(false)
    }

};

export const createUser = async (req: Request, res: Response) => {
    try {
        if (!req.body || !req.body.info) {
            res.json({
                error: true,
                message: "không có input được gửi đến"
            })
        }
        const token = createTokenUser(8)
        const { full_name, email, password, phone, status, role_id } = req.body.info
        const existUser = await UserAmin.findOne({
            where: {
                email
            },
            raw: true
        })
        if (existUser) {
            res.json({
                error: true,
                message: "email đã tồn tại"
            })
        } else {
            await UserAmin.create({
                full_name,
                email,
                password,
                phone,
                status,
                role_id,
                token
            })
            res.json({
                message: "tạo tài khoản thành công"
            })
        }
    }
    catch (error) {
        console.error('Lỗi khi tạo user:', error);
        res.json(false)
    }
};

export const editUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        if (!req.body || !req.body.info) {
            res.json(false);
        }
        const { full_name, email, password, phone, status, role_id, token } = req.body.info
        const existUser = await UserAmin.findOne({
            where: {
                email
            },
            raw: true
        })
        if (existUser) {
            await UserAmin.update({
                full_name,
                email,
                password,
                phone,
                status,
                role_id,
                token
            },
                {
                    where: {
                        id: id
                    }
                })
            res.json({
                message: "tạo tài khoản thành công"
            })
        } else {
            res.json({
                error: true,
                message: "không tìm thấy tài khoản này"
            })
        }
    }
    catch (error) {
        console.error('Lỗi khi tạo user:', error);
        res.json(false)
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        await UserAmin.destroy({
            where: {
                id: id
            }
        })
        res.json({
            message: "xóa tài khoản thành công"
        })
    }
    catch (error) {
        console.error('Lỗi khi tạo user:', error);
        res.json(false)
    }
};
