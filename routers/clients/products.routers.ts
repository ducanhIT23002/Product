import { Router } from "express"
import * as controller from "../../controllers/clients/products.controller"
import { authToken } from "../../middleware/client/user.middleware"
const router : Router = Router()

router.get("/", controller.index)
router.get("/all", controller.listAllItem)
router.get("/:name", controller.itemCategory)
router.get("/detail/:slug",authToken , controller.detaiItem)


export const productRouter : Router = router;