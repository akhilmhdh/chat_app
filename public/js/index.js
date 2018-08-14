let socket=io();
socket.on('connect',function(){
    console.log('connected to server');
    socket.emit('createEmail',{
        text:"hellooooo",
        email:'abc@123'
    });
});
socket.on('disconnect',function(){
    console.log('disconnected from server');
});

socket.on('newEmail',function(email){
    console.log(email);
});

socket.emit('createMessage',{
    from:'papu',
    text:"hlo12334",
    createdAt:'1234'

})

socket.on('newMessage',function(msg){
    console.log(msg);

})