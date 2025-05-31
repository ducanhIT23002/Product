import { Request, Response } from "express";
import Cart from "../../model/cart.model";
import CartItem from "../../model/cart_item.model";
import Product from "../../model/product.model";
import CartStore from "../../model/store_cart.model";
import { codeOrder } from "../../helpers/cartCode";

export const addStoreCart = async (req: Request, res: Response) => {
    const userID = req.params.userID
    const title = req.body.title; // title

    const store = await CartStore.findOne({
        where: {
            userID: userID,
            title: title
        },
        raw: true
    })
    if (store) {
        await CartStore.update({
            quantity: store["quantity"] + 1,
            totalPrice: (store["quantity"] + 1) * store["price"]
        },
            {
                where: {
                    userID: userID,
                    title
                }
            }
        )
        res.json({
            message: "đã update số lượng thành công"
        })
    } else {
        const product = await Product.findOne({
            where: {
                title: title
            },
            raw: true
        })
        if (!product) {
            res.json(
                {
                    message: "sản phầm ko tồn tại"
                }
            )
        }
        const newPrice = (1 - product["discount"] / 100) * product["price"]
        const object = {
            userID: userID,
            title: product["title"],
            image: product["image"],
            price: newPrice,
            quantity: 1,
            totalPrice: newPrice
        }
        await CartStore.create(object)
        res.json({
            message: "đã thêm sản phầm thành công"
        })
    }
    // id	userId	image	title	price	quantity	totalPrice	deletedAt	createdAt	updatedAt	
}

export const GetStoreCart = async (req: Request, res: Response) => {
    const userID = req.params.userID
    const data = await CartStore.findAll({
        where: {
            userID: userID
        },
        raw: true
    })
    if (data) {
        let count = 0;
        for (const item of data) {
            count += item["quantity"];
        }
        const result = {
            data: data,
            quanity: count
        }
        res.json(result)
    } else {
        res.json({
            data: [],
            quanity: 0
        })
    }
}


export const updateStoreCart = async (req: Request, res: Response) => {
    const userID = req.params.userID
    const { id, quantity } = req.body

    const findItem = await CartStore.findOne({
        where: {
            id: id,
            userID: userID
        }
    },
    )
    if (findItem) {
        if (quantity === 0) {
            await CartStore.destroy({
                where: {
                    id: id,
                    userID: userID
                }
            })
            const data = await CartStore.findAll({
                where: {
                    userID: userID
                },
                raw: true
            })
            let count = 0;
            for (const item of data) {
                count += item["quantity"];
            }
            res.json({
                quantity: count
            })
        } else {
            await CartStore.update({
                quantity: quantity,
                totalPrice: findItem["price"] * quantity
            },
                {
                    where: {
                        id: id,
                        userID: userID
                    }
                }
            )
            const data = await CartStore.findAll({
                where: {
                    userID: userID
                },
                raw: true
            })
            let count = 0;
            for (const item of data) {
                count += item["quantity"];
            }
            res.json({
                quantity: count
            })
        }
    } else {
        res.json({
            message: "ko tìm thầy sản phẩm trong giỏ hàng"
        })
    }
}


export const GetCart = async (req: Request, res: Response) => {
    const userID = req.params.userID
    const cart = await Cart.findOne({
        where: {
            userID: userID
        },
        raw: true
    })
    if (cart) {
        const data = await CartItem.findAll({
            where: {
                cartId: cart["id"]
            },
            raw: true
        })
        console.log(data)
    }
}


//ORDER
export const AddCart = async (req: Request, res: Response) => {
    const userID = req.params.userID
    const cartInfo = req.body
    const code = codeOrder()
    const getCartStore = await CartStore.findAll({
        where: {
            userID: userID,
        },
        raw: true
    })
    if (getCartStore.length > 0) {
        const dataOrder = {
            code: code,
            fullName: cartInfo.fullName,
            phone: cartInfo.phone,
            note: cartInfo.note,
            userID: userID
        }
        const cart = await Cart.create(dataOrder)
        if (cart) {
            for (let itemCart of getCartStore) {
                const getIDproduct = await Product.findOne({ where: { title: itemCart["title"] }, raw: true })
                const object = {
                    cartId: cart["id"],
                    productId: getIDproduct["id"],
                    quantity: itemCart["quantity"],
                    price: itemCart["totalPrice"],
                    discount: getIDproduct["discount"],
                    timeStart: cart["createdAt"]
                }
                await CartItem.create(object)
            }
            await CartStore.destroy({
                where: {
                    userID: userID
                }
            })
            res.json({
                message: "order thành công"
            })
        }
    } else {
        res.json({
            message: "ko tìm thấy sản phẩm nào trong giỏ hàng của người dùng"
        })
    }
}
