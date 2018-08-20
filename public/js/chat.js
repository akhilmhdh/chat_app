let socket=io();
let msg=document.querySelector('#msg-form input');
let msgList=document.querySelector('#msgList');
let btn=document.querySelectorAll("#msg-form button")
let msgTemp=document.querySelector("#msg-template").innerHTML;
let chat=document.querySelector(".chat");
let usrList=document.querySelector(".usrList");

socket.on('connect',function(){
   let param=deparam(window.location.search.slice(1));
   param.room=param.room.toLowerCase();
   socket.emit('join',param,function(err){
       if(err){
           alert(err);
           window.location.href="/";
       }
       else{
           console.log("connected");
       }
   })
});
socket.on('disconnect',function(){
    console.log('disconnected from server');
});

scrollToBottom=()=>{
    let prevMsgHeight=0;
    let clientHeight=msgList.clientHeight;
    let scrollTop=msgList.scrollTop;
    let scrollHeight=msgList.scrollHeight;
    if(msgList.lastElementChild.previousElementSibling){
        prevMsgHeight=msgList.lastElementChild.previousElementSibling.clientHeight;
    }
    newMsgHeight=msgList.lastElementChild.clientHeight;
    if(clientHeight+scrollTop+newMsgHeight+prevMsgHeight>=scrollHeight){
        chat.scrollBy(0,scrollHeight);
    }
};

let sendMsg=(e)=>{
    e.preventDefault();
    socket.emit('createMessage',{
        from:'User',
        text:msg.value
    },function(){
        msg.value="";
    });
}
let sendLocation=(e)=>{
    e.preventDefault();
    btn["1"].disabled=true;
    btn["1"].innerText="Sending Location...";
    if(!navigator.geolocation){
        alert("Sry!!Not supported on yor device");
    }
    navigator.geolocation.getCurrentPosition(function(pos){
        btn["1"].disabled=false;
        btn["1"].innerText="Send Location";
        socket.emit('location',{
            lat:pos.coords.latitude,
            lng:pos.coords.longitude
        });
    },function(err){
        btn["1"].disabled=false;
        btn["1"].innerText="Send Location";
        alert(err);
    });
};

btn["0"].addEventListener('click',sendMsg);
btn["1"].addEventListener('click',sendLocation);

socket.on('newMessage',function(msg){
    let html=Mustache.render(msgTemp,{
        text:msg.text,
        from:msg.from,
        time:moment(msg.CreatedAt).format('h:mm a')
    });
    msgList.innerHTML+=html;
    scrollToBottom();
});

socket.on('newLocation',function(msg){
    let a=`<a target=${"_blank"} href=${msg.url}>My current location</a>`;
    msgList.innerHTML+=`<li>${msg.from} ${moment(msg.CreatedAt).format('h:mm a')}:${a}</li>`;
});

socket.on('updateUsersList',function(users){
    let ol=document.createElement('ol');
    users.forEach(el => {
        let li=document.createElement('li');
        li.innerHTML=el;
        ol.appendChild(li);
    });
    usrList.innerHTML=ol.outerHTML;
});