const  mongoose = require("mongoose" ) ; 

const fileVersionSchema = new mongoose.Schema({
    fileId : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "File"
    },
    content : {
        type : String , 
        required : true , 
        default : '' , 
    }, 
    deletedBy : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "User"
    },
    timeStamp : {
        type : Date , 
        default : Date.now , 
    },
}) ; 

module.exports = mongoose.model("FileVersion" , fileVersionSchema ) ; 

