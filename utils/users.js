const users = []
// console.log("Users :-", users)

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
        return users.splice(index,1)[0]
    }
}

function getRoomUsers(room){
    console.log(users.filter(user => user.room === room))
    console.log(room)
    return users.filter(user => user.room === room)
}


module.exports = { userJoin, getCurrentUser , userLeave, getRoomUsers}