import express from "express";
import cors from 'cors'
import bodyParser from 'body-parser';
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


app.use(express.json({limit: '10kb'}))
app.use(bodyParser.json())     //it will parse the json data
app.use(bodyParser.urlencoded({extended: true}))




app.use( (req, res,next) => {
    // res.send("server is working! YaY!")
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
    next();
})


app.use('/api/auth', userRoute)
app.use('/api/chat', chatRoute)

export default app;
