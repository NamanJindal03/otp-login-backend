const User = require('../../../models/user');

const OTP = '1234';
//registers a new user
module.exports.register = (req, res) =>{
    //console.log(req.body);
    const{mobile_number} = req.body;
    


    //Checks whether number already exists or not
    User.findOne({mobile_number:mobile_number}, function(err,user){
        if(err){
            console.log(err);
            return res.status(404).json({ status: 404, error: "There is an error in finding user in db"});
        }
        //if number doesnt exist in db then register the user
        if(!user){
            User.create(req.body, function(err,user){
                if(err){
                    console.log(err);
                    return res.status(400).json({  error: "error in creating user"});
                }
                user.otp = OTP;
                user.save();
                return res.status(200).json({  message: "otp succesfully generated"});
            })
        }
        
        else{
            user.otp = OTP;
            user.save();
            return res.status(200).json({ message: "otp succesfully generated"});
        }

    })
}

module.exports.login = (req,res) =>{
    const {mobile_number, otp} = req.body;
    User.findOne({mobile_number}, function(err, user){
        if(err){
            return res.status(400).json({error: "error in sending otp"})
        }

        if(!user || !user.authenticate(otp)){
            console.log("wrong otp");
            return res.status(400).json({error: "Wrong OTP"})
        }
        
        
        //sending response to frontend
        return res.status(200).json({message: "succesful"});
    })
}

