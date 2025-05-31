import { Express } from "express";
import { categoryRouter } from "./category.routers";
import { searchRouter } from "./search.routers";
import { productRouter } from "./products.routers";
import { userRouter } from "./user.routers";
import { forgotPasswordRouter } from "./forgotPassword.router";
import { cartRouter } from "./cart.routers";
const clientRouters = (app: Express): void => {
    app.use('/category', categoryRouter)
    app.use('/search', searchRouter)
    app.use('/product', productRouter)
    app.use('/users', userRouter)
    app.use('/forgot-password', forgotPasswordRouter)
    app.use('/cart', cartRouter)

}
export default clientRouters