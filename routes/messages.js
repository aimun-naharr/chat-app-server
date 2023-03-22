import express from 'express'
import { getAllMsg, sendMsg } from '../controller/messages.js';


const router=express.Router()

router.post('/sendMsg', sendMsg)
router.post('/getAllMsg', getAllMsg)

export default router;