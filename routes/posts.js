import { Router } from "express";
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js"
import * as postsCtrl from "../controllers/posts.js"

const router = Router()

// Public Routes
router.get("/", postsCtrl.index)

// Protected Routes
router.use(decodeUserFromToken)
router.post("/", checkAuth, postsCtrl.create)
router.delete('/:id', checkAuth, postsCtrl.delete)
router.put("/:id", checkAuth, postsCtrl.update)
router.put('/:id/add-photo', checkAuth, postsCtrl.addPhoto)
router.get("/:id", checkAuth, postsCtrl.show)
router.patch('/:id', checkAuth, postsCtrl.closePost)

export { router }