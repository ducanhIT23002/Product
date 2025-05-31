import { Router } from "express"
import * as controller from "../../controllers/clients/forgotPassword.controller"

const router : Router = Router()

router.post("/otp", controller.forgotPassword)
router.post("/check-otp", controller.checkOTP)

export const forgotPasswordRouter : Router = router;