const path=require('path');
const express=require("express");
const socketIO=require("socket.io");
const http=require('http');
const publicPath=path.join(__dirname,'../public')

const {genMsg,genLocation}=require('./utils/message')
const {isRealString,unique}=require('./utils/validation')
const {users,rooms}=require("./utils/users")

let port=process.env.PORT || 3000;

let app=express();
let server=http.createServer(app)
let io=socketIO(server)
let user=new users();
let room=new rooms();

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    io.emit('updateRoomList',room.getRoomList());
    socket.on('join',(params,callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            callback('Name and Room are required');
        }
        else if((user.getUsersList(params.room).findIndex((usr)=>usr===params.name))!=-1){
            callback('Already Name taken');
        }
        else{
        socket.join(params.room);
        if(room.enterRoom(params.room)){
            io.emit('updateRoomList',room.getRoomList());
        }
        
        user.removerUser(socket.id);
        user.addUser(socket.id,params.name,params.room);
        
        io.to(params.room).emit('updateUsersList',user.getUsersList(params.room));
        
        socket.emit('newMessage',genMsg("Admin","Welcome to the Chat Room"));
        socket.broadcast.to(params.room).emit('newMessage',genMsg("Admin",`${params.name} joined chat room`));
        callback();
    }
    });
    socket.on('createMessage',function(msg,callback){
        let usr=user.getUser(socket.id);
        if(usr){
            io.to(usr.room).emit('newMessage',genMsg(usr.name,msg.text));
        }
        callback();
    });
    socket.on('location',function(msg){
        let usr=user.getUser(socket.id);
        if(usr){
        io.to(usr.room).emit('newLocation',genLocation(usr.name,msg.lat,msg.lng));
        }
    });
    socket.on('disconnect',()=>{
        var usr=user.removerUser(socket.id);
        if(usr){
            io.to(usr.room).emit('updateUsersList',user.getUsersList(usr.room));
            io.to(usr.room).emit('newMessage',genMsg("Admin",`${usr.name} has left`));
            if(room.leaveRoom(usr.room)){
                io.emit('updateRoomList',room.getRoomList());
            };
        }
    });
})

server.listen(port,()=>{
    console.log(`Connected to localhost:${port}`);
});