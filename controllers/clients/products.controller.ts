import { Request, Response } from "express";
import Product from "../../model/product.model"
import Category from "../../model/category.model";

export const index = async (req: Request, res: Response) => {
    const products = await Product.findAll({
        where: {
            status: "active",
            deleted: false
        },
        raw: true
    });
    const categories = await Category.findAll({ raw: true });

    const data = categories.map(cateItem => {
        const filteredProducts = products.filter(item => item["idCategory"] === cateItem["id"]);
        return { [cateItem["title"]]: filteredProducts };
    });
    //   console.log(JSON.stringify(data, null, 2));
    //null: tham số replacer (bằng null nghĩa là dùng mặc định, không lọc bớt field nào).
    //2: tham số space, xác định số khoảng trắng để thụt lề mỗi cấp độ, ở đây là 2 khoảng trắng.
    res.json(data);
}

export const listAllItem = async (req: Request, res: Response) => {
    const products = await Product.findAll({
        where: { deleted: false },
        raw: true
    });
    res.json(products);
}


export const itemCategory = async (req: Request, res: Response) => {
    const nameCategory = req.params.name
    const categories = await Category.findOne({
        where: {
            title: nameCategory
        },
        raw: true
    });
    const products = await Product.findAll({
        where: { 
            idCategory: categories["id"],
            status : "active",
            deleted :false
         },
        raw: true
    });
    res.json(products);
}



export const detaiItem = async (req: Request, res: Response) => {
    const slug = req.params.slug
    const item = await Product.findOne({
        where: {
            slug: slug,
            deleted: false
        },
        raw: true
    });
    res.json(item);
}
