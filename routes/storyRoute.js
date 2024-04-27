import { createChat, createStories, createStory, getsingleStory, getstory } from "../controller/storyController.js";
import { VerifyToken } from "../middleware/auth.js";
import express from 'express'

const router = express.Router()


router.post('/story', VerifyToken, createStory)
router.patch('/updatestory', VerifyToken, createChat)
router.get('/getstory', VerifyToken, getstory)
router.get("/readsinglestory/:id", VerifyToken, getsingleStory)
router.post('/stories', VerifyToken, createStories)

export default router