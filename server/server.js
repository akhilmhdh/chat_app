const path=require('path');
const express=require("express");
const socketIO=require("socket.io");
const http=require('http');
const publicPath=path.join(__dirname,'../public')

let port=process.env.PORT || 3000;

let app=express();
let server=http.createServer(app)
let io=socketIO(server)

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log("User got connected");

    socket.emit('newMessage',{
        from:'admin',
        text:"welcome to chat app",
        createdAt: new Date().getTime()
    })

    socket.broadcast.emit('newMessage',{
        from:'admin',
        text:'new user joined',
        createdAt: new Date().getTime()
    });
  
    socket.on('createMessage',function(msg){
        console.log(msg);
        io.emit('newMessage',{
            text:msg.text,
            from:msg.from,
            createdAt:new Date().getTime()
        });
    });
    socket.on('disconnect',()=>{
        console.log('User is disconnected');
    });
})

server.listen(port,()=>{
    console.log(`Connected to localhost:${port}`);
});