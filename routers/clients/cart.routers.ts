import { Router } from "express"
import * as controller from "../../controllers/clients/cart.controller"
import { authToken } from "../../middleware/client/user.middleware"
const router : Router = Router()

router.get("/:userID", controller.GetCart)
router.post("/add/:userID", authToken , controller.AddCart)
router.post("/store/add/:userID", authToken , controller.addStoreCart)
router.post("/store/updated/:userID", authToken , controller.updateStoreCart)
router.get("/store/get/:userID", authToken , controller.GetStoreCart)


export const cartRouter : Router = router;