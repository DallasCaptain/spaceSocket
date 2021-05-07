const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(__dirname + '/static'))



var users = {}

io.on('connection',(socket)=>{
    console.log('new connection from:', socket)
    socket.emit('welcome','Hello from server')
    users[socket.id]= {loc:newship()}
    socket.emit('newship',{loc:users[socket.id].loc})
    console.log(users)

    socket.on('move',dir=>{
        if(dir ==='left'){
            users[socket.id].loc -= 5
        }else if(dir ==='right'){
            users[socket.id].loc += 5
        }

        io.emit('redraw',users)
    })


})

function newship(){
    let start = Math.floor(Math.random()*400 +70)
    return(start)
}

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

server.listen(3000)