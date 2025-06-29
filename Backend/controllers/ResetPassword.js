const User = require("../models/User");
const mailsender = require("../utils/mailsender") ; 
const bcrypt = require("bcryptjs") ; 
require("dotenv").config() ; 

exports.resetPasswordToken = async (req ,res) => { 

    try{
        const {email} = req.body ; 
        const user = await User.findOne({email}) ; 
        if(!user){
            return res.status(200).json({
                success : false , 
                message : 'User is not Registered with us', 
            })
        }

        const token = crypto.randomUUID() ; 

        const updatedUser = await User.findOneAndUpdate({email} , {
            token : token , 
            resetPasswordExpires : Date.now() + 5* 60 *1000 ,
        } , {new : true })  ; 

        const url= process.env.UPDATEPASSWORD_URL + token ; 

        await mailsender(email , 'password Reset Link' , `password Reset Link : ${url}`) ; 

        return res.status(200).json({
            success : true , 
            message : 'Email Sent successfully please check email and change password',
            token , 
        })
    }
    catch(err){
        console.error(err) ; 
        return res.status(500).json({
            success : false , 
            message : 'Something went wrong' , 
            error : err.message  ,
        })
    }
}

exports.resetPassword = async (req ,res) => { 

    try{
        const {password , confirmPassword , token } = req.body ; 
        if(password != confirmPassword){
            return res.status(200).json({
                success : false , 
                message : 'Password and confirm password must be same', 
            })
        }

        console.log("password same passed")
        
        
        const user = await User.findOne({token}) ; 
        
        if(!user){
            return res.status(200).json({
                success : false , 
                message : 'Token is Invalid', 
            })
        }
        console.log("user matched passed" , user ) ; 

        if(user.resetPasswordExpires < Date.now() ){
            return res.status(200).json({
                success : false , 
                message : 'Token is expired please regenerate', 
            })
        }
        console.log("token is valid " ) ;
        
        const hashedPassword = await bcrypt.hash(password , 10 ) ; 
        
        await User.findOneAndUpdate({token} , {password : hashedPassword} , {new :true }) ; 
        
        console.log("pasword saved " ) ;

        return res.status(200).json({
            success : true , 
            message : 'password changed Successfully', 
        })
    }
    catch(err){
        console.error(err) ; 
        return res.status(500).json({
            success : false , 
            message : 'password cannot be changed, please try again' , 
            error : err.message  ,
        })
    }
}