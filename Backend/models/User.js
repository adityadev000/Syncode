const mongoose = require("mongoose") ; 

const userSchema = new mongoose.Schema({
    firstName : {
        type : String , 
        required : true , 
        trim: true,
    },
    lastName : {
        type : String , 
        required : true , 
        trim: true,
    },
    userName : {
        type : String , 
        required : true , 
        unique: true,
        trim: true,
        minlength: 3,
    },
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password : {
        type: String,
        required: true,
    },
    avtarUrl : {
        type: String,
        default : "" ,
    },
    bio : {
        type: String,
        maxlength: 300,
        default : null ,
        
    },
    gender : {
        type: String,
        default : null ,
        
    },
    projectCreated: [
        {
            type : mongoose.Schema.Types.ObjectId ,
            ref:"Project"
        }
    ],
    projectCollaborated: [
        {
            type : mongoose.Schema.Types.ObjectId ,
            ref:"Project"
        }
    ],
    resetPasswordExpires : {
        type : Date , 
    } ,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    token : ({
        type : String ,
    }),
}) ;

module.exports =  mongoose.model("User" , userSchema ) ;

