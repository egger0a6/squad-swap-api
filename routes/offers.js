import { Router } from "express";
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js"
import * as offersCtrl from "../controllers/offers.js"

const router = Router()

// Public Routes

// Protected Routes
router.use(decodeUserFromToken)
router.post("/", checkAuth, offersCtrl.create)

export { router }