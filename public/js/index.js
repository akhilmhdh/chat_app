let socket=io();
let msg=document.querySelector('#msg-form input');
let msgList=document.querySelector('#msgList');

socket.on('connect',function(){
    console.log('connected to server');
});
socket.on('disconnect',function(){
    console.log('disconnected from server');
});

let sendMsg=(e)=>{
    e.preventDefault();
    socket.emit('createMessage',{
        from:'User',
        text:msg.value
    },function(){
    });
    
}

document.querySelector("#msg-form").addEventListener('submit',sendMsg);

socket.on('newMessage',function(msg){
    msgList.innerHTML+=`<li>${msg.from}:${msg.text}</li>`;
})