let socket=io();
socket.on('connect',function(){
    console.log('connected to server');
});
socket.on('disconnect',function(){
    console.log('disconnected from server');
});


socket.emit('createMessage',{
    from:'papu',
    text:"hlo12334",
    createdAt:'1234'
});

socket.on('newMessage',function(msg){
    console.log(msg);

})