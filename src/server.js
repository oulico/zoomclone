import { WebSocketServer } from "ws";
import http from "http";
import express from "express";

const app = express();

app.set("view engine", "pug")
app.set("views", __dirname + "/views")
app.use("/public", express.static(__dirname + "/public"))
app.get("/",(req,res)=> res.render("home"))

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocketServer({server});

function onSocketClose(){
	console.log("close session")
}



wss.on("connection", (socket)=> {
	console.log("Connected to Browser")
	socket.on("close", onSocketClose)
	socket.on("message", (message)=>{
		socket.send(message.toString("utf-8"))
	})
})

server.listen(3000, handleListen)
