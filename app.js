const express = require('express');
const app = express();
const io = require('socket.io')(); //activate the chat plugin

//serve up static files
app.use(express.static('public'));

//ad routes
app.use(require('./routes/index'));
app.use(require('./routes/contact'));
app.use(require('./routes/portfolio'));

const server = app.listen(3000,() => {
  console.log('listening in port 3000');
});

io.attach(server);


io.on('connection', socket => {
  //console.log('a user has connected!')
  
  sendTimeMessage(socket);

 function sendTimeMessage(socket) {
  console.log("in time");
  var now = new Date().getTime();

  socket.emit('notification', {'message': now});

  setTimeout(function() {
    socket.emit('notification', {'message': "after 5s"});
  },5000);
 }

  io.emit('chat message', { for : 'everyone', message : `A new user has entered the chat`});

  socket.on('chat message', msg => {
     io.emit('chat message', { for : 'everyone', message : msg});
     //socket.broadcast.emit('chat message', msg); //added this to send the message to all the users who are accessing the same site(localhost)
     sendTimeMessage(socket);
  });


  socket.on('disconnect', () => {
    //console.log('a user disconnected');

    io.emit('disconnect message', `A user has left the chat!`);
  });
});







///////THIS WAS ME TRYING TO MAKE THE NICKNAME THING FOR THE DIFFERENT ROOMS....didn't work so i took it out
// io.on('connection', function(socket) {
//     socket.on('send-nickname', function(username) {
//         socket.nickname = nickname;
//         users.push(socket.nickname);
//         socket.emit('showRooms', rooms);
//     });
//
//     socket.on('disconnect', function() {
//         socket.broadcast.to(socket.room).emit('notice', socket.nickname + ' has left the room');
//         users.splice(users.indexOf(socket.nickname), 1);
//         socket.emit('showRooms', rooms);
//     });
//
//     socket.on('message', function(data) {
//         socket.broadcast.to(socket.room).emit('message', data);
//     });
//
//     socket.on('createRoom', function(room) {
//         socket.leave(socket.room);
//         socket.room = room;
//         rooms.push(socket.room);
//         socket.join(socket.room);
//         socket.emit('showRooms', rooms);
//         console.log('Rooms: ' + rooms);
//         socket.broadcast.to(socket.room).emit('notice', socket.nickname + ' has joined to room');
//     });
//
//     socket.on('connectToRoom', function(room) {
//         console.log('Will connect to that room: ' + room);
//         socket.join(room);
//     });
// });
