import express from "express";
import morgan from "morgan"; //HTTP request logger middleware for node.js
import rateLimit from 'express-rate-limit'
import helmet from "helmet"; //helps you secure your Express apps by setting various HTTP headers. 
import mongoSanitize from 'express-mongo-sanitize' //middleware which sanitizes user-supplied data to prevent MongoDB Operator Injection.
import cors from 'cors'
import bodyParser from 'body-parser';
import xss from 'xss' //xss is a module used to filter input from users to prevent XSS attacks.
import userRoute from './routes/user.js'
import chatRoute from './routes/messages.js'
const app = express();
app.use(express.urlencoded({
    extended: true
}))
// app.use(xss())
app.use(mongoSanitize())
app.use(cors({
    origin: 'http://127.0.0.1:5173/',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    credentials: true
}))
app.use(express.json({limit: '10kb'}))
app.use(bodyParser.json())     //it will parse the json data
app.use(bodyParser.urlencoded({extended: true}))
app.use(helmet())    //it will set up various headers in the response
if(process.env.NODE_ENV=== 'development'){
    app.use(morgan('dev'))
}

const limiter=rateLimit({
    max: 3000, //max request can be 3000
    windowMs: 60* 60 * 1000, // in one hour
    message: 'Too many request from this id, please try again in one hour'
})
// app.use('/talk', limiter)
app.use('/', (req, res) => {
    res.send("server is working! YaY!")})
app.use('/api/auth', userRoute)
app.use('/api/chat', chatRoute)

export default app;
