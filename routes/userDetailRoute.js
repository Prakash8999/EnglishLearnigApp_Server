import { updateUser, userDetail } from "../controller/userDetailController.js";
import { VerifyToken } from "../middleware/auth.js";
import express from 'express'

const router = express.Router()


router.get('/profile', VerifyToken, userDetail)
router.patch('/updateuser', VerifyToken, updateUser)

export default router