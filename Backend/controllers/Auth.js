const User = require("../models/User") ; 
const otpGenerator = require("otp-generator") ; 
const bcrypt = require("bcryptjs") ; 
const jwt = require("jsonwebtoken") ; 
const Otp = require("../models/otp") ; 


require("dotenv").config ; 


//passwordAuthenticate
function passwordAuthenticate(password) {
    const data = {
        uppercase : "QWERTYUIOPLKJHGFDSAZXCVBNM",
        lowercase : "qwertyuioplkjhgfdsazxcvbnm",
        special_char : "~!@#$%^&*()_+=[{]};:',./<>?",
        number : "1234567890"
    }
    
        //check password condtion 
        let uppercase = false ; 
        let lowercase = false ; 
        let number = false ; 
        let special_char = false ; 

        if(password.length < 8 ){
            return false ; 
        }
        else{
            for(let i = 0 ; i< password.length ; i++  ){
                if(uppercase && lowercase && number && special_char ){
                    break ; 
                }
                const char = password[i] ; 
                for(let j = 0 ; j < data.lowercase.length ; j ++ ){
                    if( char ===  data.lowercase[j] ) {
                        lowercase = true ; 
                    }
                    else if(char === data.uppercase[j] ){
                        uppercase = true ; 
                    }
                }
                for(let j = 0 ; j < data.number.length ; j ++ ){
                    if( char ===  data.number[j] ) {
                        number = true ; 
                    }
                }
                for(let j = 0 ; j < data.special_char.length ; j ++ ){
                    if( char ===  data.special_char[j] ) {
                        special_char = true ; 
                    }
                }
            }
        }
        if(!uppercase || !lowercase || !special_char || !number){
            return false ; 
        }
        else{
            return true ; 
        }
}


exports.sendOtp = async (req ,res) => { 

    try{
        const {email , password } = req.body ; 

        //validate email and password 
        if(!email || ! password ){
            return res.status(200).json({
                success : false , 
                message : 'email and password is required', 
            })
        }

        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.status(200).json({
                success : false , 
                message : 'User is already registered', 
            })
        }

        const passwordAuth = passwordAuthenticate(password) ; 
        if(!passwordAuth){
            return res.status(200).json({
                success : false , 
                message : 'password required condition not fullfilled', 
            })
        }

        var otp = otpGenerator.generate(4 , {
            upperCaseAlphabets : false , 
            lowerCaseAlphabets : false , 
            specialChars : false ,
        })

        let result = await Otp.findOne({otp}) ; 

        while(result){
            otp = otpGenerator.generate(4 , {
                upperCaseAlphabets : false , 
                lowerCaseAlphabets : false , 
                specialChars : false ,
            })

            result = await Otp.findOne({otp}) ; 
        }

        const otpBody = await Otp.create({email , otp}) ; 

        return res.status(200).json({
            success : true , 
            message : 'Otp send Successfully', 
            otp , 
        })
    }
    catch(err){
        console.error(err) ; 
        return res.status(500).json({
            success : false , 
            message : 'Failed to send Otp' , 
            error : err.message  ,
        })
    }
}

exports.signup = async (req ,res) => { 

    try{
        const {firstName , lastName ,  email , password , confirmPassword , otp} = req.body;

        //validate all 
        if(!firstName || !lastName , !email || !password || !confirmPassword || !otp ) {
            return res.status(200).json({
                success : false , 
                message : 'All fieds are mandatory ', 
            })
        }

        //password verification 
        if(password != confirmPassword ){
            return res.status(200).json({
                success : false , 
                message : 'password and confirmPassword must be same', 
            })
        }

        //user is already registered is checked while sending otp. 

        const recentOtp = await Otp.find({email}).sort({createdAt : -1 }).limit(1);

        if(recentOtp.length === 0 ){
            return res.status(200).json({
                success : false , 
                message : 'Otp not found or Expired', 
            })
        }else if (otp.toString() !== recentOtp[0].otp){
            return res.status(200).json({
                success : false , 
                message : 'Invalid Otp', 
            })
        }

        //time to hash password 
        const hashedPassword = await bcrypt.hash(password , 10 ) ;
        const username = email.split("@")[0];

        const user = await User.create({
            firstName , 
            lastName , 
            username ,
            email ,
            password : hashedPassword , 
            avtarUrl : `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
            
        })

        return res.status(200).json({
            success : true , 
            message : 'User Registered Successfully',
            user , 
        })

    }
    catch(err){
        console.error(err) ; 
        return res.status(500).json({
            success : false , 
            message : 'user cannot be resistered. please try again' , 
            error : err.message  ,
        })
    }
}

exports.login = async (req ,res) => { 

    try{
        const {email , password } = req.body ; 

        if(!email || ! password ){
            return res.status(200).json({
                success : false , 
                message : 'Email and password are required', 
            })
        }

        const existingUser = await User.findOne({email}) ; 

        if(!existingUser) {
            return res.status(200).json({
                success : false , 
                message : 'User is not registered with us', 
            })
        }

        //password verification 
        if(await bcrypt.compare(password , existingUser.password)){
            const payload = {
                email: existingUser.email , 
                id : existingUser._id , 
            }

            const token  = jwt.sign(payload , process.env.JWT_SECRET , {expiresIn : "24h"} ) ; 

            existingUser.token = token ; 
            existingUser.password = undefined ; 

            const option = {
                expiresIn : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) ,
                httpOnly : true , 
            }

            res.cookie("token" ,token , option ).status(200).json({
                success : true , 
                token , 
                user : existingUser , 
                message : "Logged In Successfully"
            })
        }else{
            return res.status(200).json({
                success : false , 
                message : 'Wrong password', 
            })
        }
    }
    catch(err){
        console.error(err) ; 
        return res.status(500).json({
            success : false , 
            message : 'failed to login' , 
            error : err.message  ,
        })
    }
}

