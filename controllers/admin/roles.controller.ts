import { Request, Response } from 'express';
import Role from '../../model/roles.model';

export const getRole = async (req: Request, res: Response) => {
    const newAccount = await Role.findAll({
        where: {
            deleted: false,
        },
        raw: true
    })
    for (let item of newAccount) {
        if (item["permissions"] !== null && item["permissions"].length > 0) {
            item["permissions"] = item["permissions"].split(",")
        }
    }
    res.json(newAccount)
};

export const getOneRole = async (req: Request, res: Response) => {
    const id = req.params.id
    const newAccount = await Role.findOne({
        where: {
            deleted: false,
            id : id
        },
        raw: true
    })
    if (newAccount["permissions"] !== null && newAccount["permissions"].length > 0) {
        newAccount["permissions"] = newAccount["permissions"].split(",")
    }

    res.json(newAccount)
};

export const createRole = async (req: Request, res: Response) => {
    try {
        await Role.create(req.body.info)
        res.json(true)
    } catch (error) {
        console.log(error)
        res.json({
            error : true,
            message : "Tạo Sản Phẩm Thất Bại"
        })
    }
};

export const updateOneRole = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        await Role.update({
            title: req.body.title,
            description: req.body.description
        }
            , {
                where: { id: id }
            }
        )

        res.json(true)
    } catch (error) {
        console.log(error)
        res.json(false)
    }
};

export const updateRole = async (req: Request, res: Response) => {
    try {
        const permission = req.body.permissions// 1 mảng
        const object = {}
        for (let item of permission) {
            const [, roleId] = item.split("_");
            if (!object[roleId]) {
                object[roleId] = "";
            }
            if (object[roleId] !== "") {
                object[roleId] += ",";
            }
            object[roleId] += item
        }
        for (let id of Object.keys(object)) {
            await Role.update({
                permissions: object[id]
            }
                , {
                    where: { id: id }
                }
            )
        }
        res.json({
            message:"update thành công"
        })
    } catch (error) {
        console.log(error)
        res.json({
            error : true,
            message : "lỗi không thể update quyền"
        })
    }
};