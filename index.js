import app from "./app.js";
import http from "http";
import * as dotenv from 'dotenv' 
import mongoose from "mongoose";
import { Server } from "socket.io";


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

// Created a Socket.io server 
const io=new Server(server, {
	cors:{
		origin: 'http://127.0.0.1:5173',
		credentials:  true,
	}
})

global.onlineUsers=new Map()

io.on("connection", (socket)=>{
	global.chatSocket=socket;
	socket.on('add-user', (userId)=>{
		onlineUsers.set(userId, socket.id)
	})
	socket.on('send-msg', (data)=>{
		const receiver=onlineUsers.get(data.to);
		if(receiver){
			socket.to(receiver).emit('rcv-msg', data.message)
		}
	})
})
