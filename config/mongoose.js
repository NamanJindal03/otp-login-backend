//setting up mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/otp-login');

const db = mongoose.connection;

//if error connecting to db 
db.on('error', console.error.bind(console, 'error connecting DB'));

//if successfully connected to db
db.once('open', function(){
    console.log('connected to database');
})

module.exports = db;