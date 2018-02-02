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
  console.log('a user has connected!')

  io.emit('chat message', { for : 'everyone', message : `${socket.id} is here!`});

  socket.on('disconnect', () => {
    console.log('a user disconnected');

    io.emit('disconnect message', `${socket.id} has left the building!`);
  });
});
