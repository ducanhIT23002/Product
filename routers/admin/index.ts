import { Express } from "express";
import { productRouter } from "./product.routers";
import { categoryRouter } from "./category.routers";
import { userRouter } from "./user.routers";
import { roleRouter } from "./role.routers";
const adminRouters = (app: Express): void => {
    const admin = "/admin"
    app.use(admin + '/product', productRouter)
    app.use(admin + '/category', categoryRouter)
    app.use(admin + '/users', userRouter)
    app.use(admin + '/role', roleRouter)
}
export default adminRouters