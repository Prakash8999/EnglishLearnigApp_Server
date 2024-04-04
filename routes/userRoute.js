import express from "express";
import { loginUser, createUser, mangroves } from "../controller/userController.js";

const router = express.Router()



// user route
router.post("/register", createUser)

router.post("/login", loginUser)



export default router