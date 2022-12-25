const moment = require('moment')

function formatMessage (username, text){
    return {
        username,
        text,
        // time: moment().format('h:mm a')
        time:moment().format('h:mm a | DD-MM-YYYY')
    } 
}


module.exports = formatMessage