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
app.use(cors({
    origin: 'http://127.0.0.1:5173',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    credentials: true
}))
app.use(express.urlencoded({
    extended: true
}))
// app.use(xss())
app.use(mongoSanitize())

app.use(express.json({limit: '10kb'}))
app.use(bodyParser.json())     //it will parse the json data
app.use(bodyParser.urlencoded({extended: true}))
app.use(helmet())    //it will set up various headers in the response


// app.use('/talk', limiter)
// app.use('/', (req, res,next) => {
//     res.send("server is working! YaY!")
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     next();
// })
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/api/auth', userRoute)
app.use('/api/chat', chatRoute)

export default app;
