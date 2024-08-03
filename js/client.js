const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
const sentAudio = new Audio('sound.mp3');
const receiveAudio = new Audio('receiveAudio.mp3');


const append = (message,position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        sentAudio.play();
    }
    else if(position=='right'){
        receiveAudio.play();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput = "";

})

const name1 = prompt('Enter your name to join');
socket.emit('new-user-joined', name1);

socket.on('user-joined', name1=>{
    append(`${name1} joined the chat`,'left');
})

socket.on('receive', data=>{
    append(`${data.name}: ${data.message} `,'left');
})