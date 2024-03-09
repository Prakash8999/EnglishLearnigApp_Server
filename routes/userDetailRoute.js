import { userDetail } from "../controller/userDetailController.js";
import { VerifyToken } from "../middleware/auth.js";
import express from 'express'

const router = express.Router()


router.get('/:id', VerifyToken, userDetail)

export default router