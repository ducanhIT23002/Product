// import express, { Express, Request, Response } from "express";
import { Router } from "express"
import * as controller from "../../controllers/clients/category.controller"

const router : Router = Router()

router.get("/", controller.category)

export const categoryRouter : Router = router;