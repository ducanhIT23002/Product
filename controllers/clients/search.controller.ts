import { Request, Response } from "express";
import Product from "../../model/product.model";
import { Op } from "sequelize"; // dùng chi tìm kiếm

export const searchItem = async (req: Request, res: Response) => {
    const input = req.body.search
    const model = await Product.findAll({
        where: {
            title: {
                [Op.regexp]:input
            }
        },
        raw: true
    });
    res.json(model)
}
