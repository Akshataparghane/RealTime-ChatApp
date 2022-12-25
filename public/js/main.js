const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')

const {username, room} = Qs.parse(location.search ,{
    ignoreQueryPrefix : true
})
// console.log(username, room)

const socket = io()

socket.emit('joinRoom', {username,room})


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