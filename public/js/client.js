$('#roomForm').submit(function() {
    socket.emit('createRoom', $('#roomName').val());
    $('#roomForm').hide();
    $('#chatForm').show();
    return false;
});

socket.on('message', function(data) {
    newMessage(data);
});

socket.on('showRooms', function(rooms) {
    console.log(rooms);
    for(var i = 0; i < rooms.length; i++) {
        $('#rooms').append($('<li>')
                        .append($('<form id="freeRoom">')
                            .append($('<span id="room">').text(rooms[i] + ' ///'))
                            .append($('<button>').text('connect'))));
    };
});

$('#freeRoom').submit(function() {
    socket.emit('connectToRoom', $('#room').text());
    return false;
});

socket.emit('send-nickname', nickname);
