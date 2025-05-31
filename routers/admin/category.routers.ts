import { Router } from "express"
import * as controller from "../../controllers/admin/category.controller"
import { roleCheck } from "../../middleware/admin/role.middleware";

const router: Router = Router()

router.get("/all", controller.getCategory)
router.post("/create",roleCheck, controller.createCategory)
router.post("/delete/:id",roleCheck, controller.deleteCategory)
export const categoryRouter: Router = router;