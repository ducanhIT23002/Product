import { Router } from "express"
import * as controller from "../../controllers/admin/product.controller"
import multer from "multer";
import { uploadImg } from "../../helpers/upload";
import { roleCheck } from "../../middleware/admin/role.middleware";
const upload = multer();


const router: Router = Router()

router.post("/change-multi", roleCheck, controller.changeMulti)
router.post("/create", roleCheck, upload.single("image"), uploadImg, controller.createProduct)
router.post("/edit/:id", roleCheck, upload.single("image"), uploadImg, controller.editProduct)
router.delete("/delete/:id", roleCheck, controller.deleteProduct)
router.get("/detail/:id", roleCheck, controller.detailProduct)
router.get("/all", controller.allPoduct)


export const productRouter: Router = router;