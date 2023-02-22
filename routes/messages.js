import express from 'express'
import { getMsg, sendMsg } from '../controller/messages.js';


const router=express.Router()

router.post('/sendMsg', sendMsg)
router.post('/getMsg', getMsg)

export default router;