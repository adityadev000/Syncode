const mongoose = require("mongoose") ;

const roomIdSchema = new mongoose.Schema({
    roomId : {
        type : String , 
        required : true , 
    }, 
    projectId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "Project" , 
        required : true , 
    },
    createdAt : {
        type : Date,
        default : Date.now , 
        expires : 5 * 60 ,
    },
})