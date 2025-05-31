import { Router } from "express"
import * as controller from "../../controllers/admin/user.controller"
import { roleCheck } from "../../middleware/admin/role.middleware";

const router: Router = Router()

router.get("/all", controller.getUser)
router.get("/get/:id",roleCheck ,controller.getOneUser)
router.post("/create",roleCheck ,controller.createUser)
router.post("/edit/:id",roleCheck ,controller.editUser)
router.post("/delete/:id",roleCheck ,controller.deleteUser)




export const userRouter: Router = router;