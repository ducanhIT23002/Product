import { Request, Response } from "express";
import Category from "../../model/category.model";
export const category = async (req: Request, res: Response) => {
    const model = await Category.findAll({
        raw: true
    });
    res.json(model)
}
    