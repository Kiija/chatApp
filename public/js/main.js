(() => {
  const socket = io();

let messageList = document.querySelector('ul'),
    chatForm = document.querySelector('form'),
    chatMessage = chatForm.querySelector('.message');

    function appendMessage(msg) {
      //debugger;
      let newMsg = `<li>${msg.message}</li>`;
      messageList.innerHTML += newMsg;
    }

    function appenedDiscMessage(msg) {
      //debugger;
      let newMsg = `<li>${msg}</li>`;
      messageList.innerHTML += newMsg;
    }

    function handleSendMessage(e) {
      e.preventDefault();
      debugger;
    }


    chatForm.addEventListener('submit', handleSendMessage, false);
    socket.addEventListener('chat message', appendMessage, false);
    socket.addEventListener('disconnect message', appenedDiscMessage, false);

})();
