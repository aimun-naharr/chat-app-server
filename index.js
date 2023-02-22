import app from "./app.js";
import http from "http";
import * as dotenv from 'dotenv' 
import mongoose from "mongoose";

dotenv.config()

const port = process.env.PORT || 8000;
const server = http.createServer(app); //creating the server

const DB=process.env.DBURI.replace('password', process.env.PASSWORD)
mongoose.connect(DB, {
	// useNewUrlParser: true,
	// useCreateIndex: true,
	// useFindAndModify: false,
	// useUnifiedTopology: true,
}).then(connection=>{
	console.log('db connection is successful') //db connected
}).catch(err=>{
	console.log(err)
})

server.listen(port, () => {
	console.log(`app is running on port: ${port}`);
});
