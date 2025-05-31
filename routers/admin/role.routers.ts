import { Router } from "express"
import * as controller from "../../controllers/admin/roles.controller"
import { roleCheck } from "../../middleware/admin/role.middleware";

const router: Router = Router()

router.get("/all", controller.getRole)
router.get("/get/:id",roleCheck, controller.getOneRole)
router.post("/create",roleCheck, controller.createRole)
router.post("/update",roleCheck, controller.updateRole)
router.post("/update/:id",roleCheck, controller.updateOneRole)


export const roleRouter: Router = router;