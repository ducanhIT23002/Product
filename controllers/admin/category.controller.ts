import { Request, Response } from 'express';
import Category from '../../model/category.model';
import { createTree } from '../../helpers/createTree';
import dayjs from "dayjs"
export const getCategory = async (req: Request, res: Response) => {
    const categories = await Category.findAll({
        where: {
            deleted: false,
            status: "active"
        },
        raw: true
    }
    )
    const tree = createTree(categories);
    for (let item of tree) {
        item.createdAt = dayjs(item.createdAt).format('DD/MM/YYYY HH:mm:ss');
    }
    res.json(tree)
};

export const createCategory = async (req: Request, res: Response) => {
    try {
        if (!req.body.input) res.json(false)
        const category = await Category.create(req.body.input);
        if (category) res.json(true)
    } catch (error) {
        console.log(error)
        res.json({
            error : true,
            message : "lỗi tạo sản phẩm"
        })
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        await Category.destroy({
            where: { id: id }
        })
        res.json(true)
    } catch (error) {
        console.log(error)
        res.json({
            error : true,
            message : "Xóa thất bại"
        })
    }

};

