class users{
    constructor(){
        this.users=[];
    }
    addUser(id,name,room){
        let user={id,name,room}
        this.users.push(user);
        return user;
    }
    removerUser(id){
        let user=this.getUser(id);
        if(user){
            this.users=this.users.filter((user)=>user.id!=id);
        }
        return user;
    }
    getUser(id){
        return this.users.find((user)=>user.id===id);
    }
    getUsersList(room){
       let list=this.users.filter((user)=>user.room==room).map((user)=>user.name);
       return list; 
    }
}
class rooms{
    constructor(){
        this.rooms={};
    }
    enterRoom(room){
        if(this.rooms.hasOwnProperty(room)){
            this.rooms[room]+=1;
            return false;
        }
        this.rooms[room]=1;
        return true;        
    }
    leaveRoom(room){
        this.rooms[room]-=1;
        if(this.rooms[room]===0){
            delete this.rooms[room];
            return true;
        };
        return false;
    }
    getRoomList(){
      return Object.keys(this.rooms)
    }
}
module.exports={users,rooms}