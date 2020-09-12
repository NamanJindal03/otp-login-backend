const mongoose = require('mongoose');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

//our schema
const userSchema = new mongoose.Schema({
    mobile_number:{
        type:String
    },
    encry_otp:{
        type: String
    },
    salt: String,
    
},{
    timestamps: true
})

//using virtuals to get unencrypted password and set encrypted password
userSchema.virtual("otp")
    .set(function(otp){
        this._otp = otp;
        this.salt = uuidv4();
        //console.log(this.securePassword(password));
        this.encry_otp = this.securePassword(otp);
        console.log(this.encry_otp)
        //console.log(this.salt);
        //console.log(this.encry_password);
    })
    .get(function(){
        return this._otp;
    })

//user schema methods
userSchema.methods = {

    //compares the plainpassword with encrypted pass and returns true or false
    authenticate: function(plainpassword) {
        return this.securePassword(plainpassword) === this.encry_otp;
    },
    //converts the plainpassword to encrypted using crypto
    securePassword: function(plainPassword){
        console.log(plainPassword);
        if(!plainPassword){
            return "";
        }
        try{
            return crypto.createHmac('sha256', this.salt)
            .update(plainPassword)
            .digest('hex')
        }catch(err){
            console.log(err);
            console.log('here')
            return "";
        }
    }
}
const User= mongoose.model('User',userSchema);
module.exports = User;