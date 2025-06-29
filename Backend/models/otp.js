const mongoose = require("mongoose"); 
const mailsender = require("../utils/mailsender");
const verificationMail = require("../mailTemplate/verificationMail");

const otpSchema = new mongoose.Schema({

    email : {
        type : String,
        trim : true , 
        reqired : true ,
    },
    otp : {
        type : String,
        required :true , 
    },
    createdAt : {
        type : Date,
        default : Date.now , 
        expires : 5 * 60 ,
    },
    
}) ; 

const sendVerificationEmail = async(email , otp )=> {
    try{
        const mailResponse = await mailsender(email , "verification Email from Syncode" , verificationMail(otp) ) 
        console.log('Email sent successfuly', mailResponse );
    }
    catch(err){
        console.error("error occured while sending mails : ",err) ; 
    }
}

otpSchema.pre("save" , async function (next)  {
    await sendVerificationEmail(this.email , this.otp) ; 
    next() ; 
})

module.exports = mongoose.model("Otp" , otpSchema);