const path=require('path');
const express=require("express");
const socketIO=require("socket.io");
const http=require('http');
const publicPath=path.join(__dirname,'../public')

const {genMsg}=require('./utils/message')

let port=process.env.PORT || 3000;

let app=express();
let server=http.createServer(app)
let io=socketIO(server)

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log("User got connected");

    socket.emit('newMessage',genMsg("Admin","Welcome to the Chat Room"));

    socket.broadcast.emit('newMessage',genMsg("Admin","New user joined chat room"));
  
    socket.on('createMessage',function(msg,callback){
        console.log(msg);
        io.emit('newMessage',genMsg(msg.from,msg.text));
        callback();
    });
    socket.on('disconnect',()=>{
        console.log('User is disconnected');
    });
})

server.listen(port,()=>{
    console.log(`Connected to localhost:${port}`);
});