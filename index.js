import app from './app.js'
import http from 'http'
import rateLimit from 'express-rate-limit'
import helmet from "helmet"; //helps you secure your Express apps by setting various HTTP headers. 
import mongoSanitize from 'express-mongo-sanitize' //middleware which sanitizes user-supplied data to prevent MongoDB Operator Injection.
import bodyParser from 'body-parser';
const port =process.env.PORT || 8000

app.use(express.json({limit: '10kb'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(helmet())
if(process.env.NODE_ENV=== 'development'){
    app.use(morgan('dev'))
}
const server=http.createServer(app) //creating the server
server.listen(port, ()=>{
    console.log(`app is running on port: ${port}`)
})