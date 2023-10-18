import { WebSocketServer } from "ws";
import http from "http";
import express from "express";

const app = express();

app.set("view engine", "pug")
app.set("views", __dirname + "/views")
app.use("/public", express.static(__dirname + "/public"))
app.get("/",(_,res)=> res.render("home"))
app.get("/*",(_,res)=> res.redirect("/"))

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocketServer({server});

function onSocketClose(){
	console.log("close session")
}

const sockets = [];

wss.on("connection", (socket)=> {
	sockets.push(socket)
	console.log("Connected to Browser")
	socket.on("close", onSocketClose)
	socket.on("message", (message)=>{
		sockets.forEach(aSocket => {
		aSocket.send(message.toString("utf-8"))
		})
	})
})

server.listen(3000, handleListen)
