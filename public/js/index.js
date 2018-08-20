let msgTemp=document.querySelector("#msg-template").innerHTML;
let roomlist=document.querySelector("#browsers");
let socket=io();
socket.on('updateRoomList',function(rooms){
    let html="";
    rooms.forEach((el)=>{
        html+=Mustache.render(msgTemp,{
            roomName:el
        });
    });
    roomlist.innerHTML=html;
});