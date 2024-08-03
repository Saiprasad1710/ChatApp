// Node server which will handle socket io connections

const io = require('socket.io')(8000,{cors:{origin:"*"}}) // imp only 8000 : we get an error
// import cors from 'cors';

// app.use(cors());
// index.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "https://localhost:8000");
// })

const users = {};

io.on('connection',socket =>{
    socket.on('new-user-joined', name1 =>{
        console.log(`${name1} has joined the chat`)
        users[socket.id] = name1;
        socket.broadcast.emit('user-joined',name1);

    });

    socket.on('send',message =>{
        socket.broadcast.emit('receive', {name:users[socket.id],message:message})
    });

})