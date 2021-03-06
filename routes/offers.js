import { Router } from "express";
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js"
import * as offersCtrl from "../controllers/offers.js"

const router = Router()

// Public Routes

// Protected Routes
router.use(decodeUserFromToken)
router.post("/", checkAuth, offersCtrl.create)
router.put("/:id", checkAuth, offersCtrl.update)
router.delete("/:id", checkAuth, offersCtrl.delete)
router.get("/:id", checkAuth, offersCtrl.getPosts)

export { router }