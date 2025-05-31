import { Router } from "express"
import * as controller from "../../controllers/clients/search.controller"

const router : Router = Router()

router.post("/", controller.searchItem)

export const searchRouter : Router = router;