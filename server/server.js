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
    socket.on('disconnect',()=>{
        console.log('User is disconnected');
    });
    socket.emit('newEmail',{
        text:"hello",
        from: "blah@123"
    });
    socket.on('createEmail',function(email){
        console.log(email);
    });
    socket.emit('newMessage',{
        from:'junnu',
        text:"hlo",
        createdAt:'123'
    });
    socket.on('createMessage',function(msg){
        console.log(msg)
    });
})

server.listen(port,()=>{
    console.log(`Connected to localhost:${port}`);
});