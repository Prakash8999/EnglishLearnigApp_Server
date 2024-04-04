import { createChat, createStory } from "../controller/storyController.js";
import { VerifyToken } from "../middleware/auth.js";
import express from 'express'

const router = express.Router()


router.get('/story', VerifyToken, createStory)
router.patch('/updatestory', VerifyToken, createChat)

export default router