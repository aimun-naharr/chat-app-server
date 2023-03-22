import express from 'express'
import { getAllUsers, login, registerUser, setAvatar } from '../controller/auth.js';

const router=express.Router()

router.post('/register', registerUser)
router.post('/login', login)
router.get('/getAllUsers/:id', getAllUsers)
router.patch('/setAvatar/:id', setAvatar)

export default router;