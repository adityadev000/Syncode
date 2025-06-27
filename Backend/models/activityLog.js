const mongoose = require("mongoose") ; 

const activityLogSchema = mongoose.Schema({

    userId : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "User" ,
        required : true , 
    } ,
    projectId : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "Project" ,
        required : true , 
    },
    action : {
        type : String , 
        enum : ["created" , "deleted" ] , 
        required : true , 
    },
    target : {
        type : String , 
        required : true , 
    },
    timpestamp : {
        type : Date , 
        default : Date.now , 
    }
}) ; 

module.exports = mongoose.model("ActivityLog" , activityLogSchema) ; 


