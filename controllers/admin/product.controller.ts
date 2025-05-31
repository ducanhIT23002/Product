import { Request, Response } from 'express';
import Product from '../../model/product.model';

export const changeMulti = async (req: Request, res: Response) => {
    const action = req.body.action
    const id = req.body.change // [1,2,3]
    switch (action) {
        case "active":
            try {
                const updateData = await Product.update(
                    {
                        status: "active"
                    },
                    {
                        where: {
                            id: id
                        }
                    }
                )
                if (updateData) {
                    res.json({
                        message: "cập nhật trạng thái thành công"
                    })
                    return
                }
            }
            catch {
                res.json({
                    message: "cập nhật trạng thái thất bại"
                })
                return
            }
        case "unactive":
            try {
                const updateData = await Product.update(
                    {
                        status: "unactive"
                    },
                    {
                        where: {
                            id: id
                        }
                    }
                )
                if (updateData) {
                    res.json({
                        message: "cập nhật trạng thái thành công"
                    })
                    return
                }
            }
            catch {
                res.json({
                    message: "cập nhật trạng thái thất bại"
                })
                return
            }
        case "delete":
            const updateData = await Product.destroy(
                {
                    where: {
                        id: id
                    }
                }
            )
            if (updateData > 0) {
                res.json({
                    message: "đã xóa bản ghi thành công"
                })
                return
            } else {
                res.json({
                    message: "đã xóa bản ghi thất bại"
                })
                return
            }
        case "change-position":
            try {
                for (let item of req.body.change) {
                    await Product.update(
                        {
                            position: item.value
                        },
                        {
                            where: {
                                id: item.id
                            }
                        }
                    )
                }
                res.json({
                    message: "thay đổi vị trí thành công"
                })
                return
            }
            catch {
                res.json({
                    message: "thay đổi vị trí thất bại"
                })
                return
            }
    }
};


export const allPoduct = async (req: Request, res: Response) => {
    const data = await Product.findAll({
        order: [["position", "DESC"]],
        where: {
            deleted: false
        },
        raw: true,
    })
    res.json(data)
};



export const createProduct = async (req: Request, res: Response) => {
    const { title, description, discount, stock, idCategory, image, price } = req.body
    const data = await Product.findOne({
        order: [["position", "DESC"]],
        raw: true,
    })
    let position = 0
    if (data) {
        position = data["position"] + 1
    } else {
        position = 1;
    }
    const slug = title.split(" ")
    let createSlug = ""
    for (let i = 0; i < slug.length; i++) {
        slug[i] = slug[i].toLowerCase();
        if (i !== slug.length - 1) {
            createSlug += slug[i] + "-";
        } else {
            createSlug += slug[i];
        }
    }
    try {
        await Product.create({
            title,
            description,
            discount: parseInt(discount),
            stock: parseInt(stock),
            idCategory: parseInt(idCategory),
            image,
            price: parseInt(price),
            position: position,
            slug: createSlug
        })
        res.json({
            message: "tạo sản phầm thành công"
        })
    } catch (error) {
        console.error("Error creating product:", error);
        res.json(error)
    }
};

export const editProduct = async (req: Request, res: Response) => {
    const id = req.params.id
    const slug = req.body.title.split(" ")
    let createSlug = ""
    for (let i = 0; i < slug.length; i++) {
        slug[i] = slug[i].toLowerCase();
        if (i !== slug.length - 1) {
            createSlug += slug[i] + "-";
        } else {
            createSlug += slug[i];
        }
    }
    try {
            req.body.discount = parseInt(req.body.discount),
            req.body.stock = parseInt(req.body.stock),
            req.body.idCategory = parseInt(req.body.idCategory),
            req.body.price = parseInt(req.body.price),
            req.body.position = parseInt(req.body.position),
            await Product.update(
                req.body,
                {
                    where: {
                        id: id
                    }
                }
            )
        res.json(true)
    } catch {
        res.json(false)
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        await Product.update({
            deleted: true,
            deletedAt: Date.now()
        },
            {
                where: { id: id }
            })
        res.json(true)
    } catch {
        res.json(false)
    }
};

export const detailProduct = async (req: Request, res: Response) => {
    const id = req.params.id
    const getItem = await Product.findOne({
        where: {
            id: id,
            deleted: false
        },
        raw: true
    })
    if (getItem) {
        res.json(getItem)
    } else {
        res.json(false)
    }
};

