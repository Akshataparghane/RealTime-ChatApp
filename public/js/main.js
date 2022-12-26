const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')


const {username , room} = Qs.parse(window.location.search.substring(1) , {
     igonreQueryPrefix : true
} )

// const username = Qs.parse('?a=b&c=d' , {
//     igonreQueryPrefix : true
// } )

const socket = io()
socket.emit('joinRoom', {username , room})

socket.on('roomUsers', ({room, user}) =>{
    console.log(room, user)
    outputRoomName(room)
    outputUsers(user)
})


socket.on('message' , message => {
    // console.log(message)
    outputMessage(message)

    chatMessages.scrollTop = chatMessages.scrollHeight

})


chatForm.addEventListener('submit' , (e) => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;
    // console.log(msg)
    socket.emit('chatMessage', msg)

    e.target.elements.msg.value = '';
    e.target.elements.msg.focus()
})


function outputMessage(message){
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML=` <p class="meta">${message.username} <time class="time"> ${message.time}</time> </p>
    <p class="text">
        ${message.text}
    </p>`
    document.querySelector('.chat-messages').appendChild(div)
}

function outputRoomName(room){
    roomName.innerText = room
}

function outputUsers(user){
    userList.innerHTML = `${user.map(user=> `<li>${user.username}</li>`).join('')}`
}

