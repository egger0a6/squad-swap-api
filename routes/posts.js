import { Router } from "express";
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js"
import * as postsCtrl from "../controllers/posts.js"

const router = Router()

// Public Routes
router.get("/", postsCtrl.index)

// Protected Routes
router.use(decodeUserFromToken)
router.post("/", checkAuth, postsCtrl.create)
router.put("/:id", checkAuth, postsCtrl.update)


export { router }