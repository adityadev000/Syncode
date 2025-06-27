const mongoose = require("mongoose") ; 

const userSchema = new mongoose.Schema({
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
        default : "" ,
        
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
    token : ({
        type : String ,
    }),
}) ;

module.exports =  mongoose.model("User" , userSchema ) ;

