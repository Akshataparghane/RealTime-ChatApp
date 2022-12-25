const users = []

function userJoin(id, username, room) {
    let user = { id, username, room }
    users.push(user)
    return users
}


function getCurrentUser(id) {
    return users.find(user => user.id == id)
}


function userLeave (id){
    let index = users.findIndex(user => user.id == id)
    if(index !== -1){
        return users.splice(index,1)
    }
}

function getRoomUsers(room){
    return users.filter(user => user.room === room)
}


module.exports = { userJoin, getCurrentUser , userLeave, getRoomUsers}