import { Router } from "express"
import * as controller from "../../controllers/clients/user.controlller"
const router : Router = Router()

router.post("/login", controller.login)
router.post("/register", controller.register)
router.post("/logout", controller.deleteUser)


export const userRouter : Router = router;
