const mongoose = require("mongoose") ; 

const fileSchema = new mongoose.Schema({
    name : {
        type : String , 
        required : true , 
        trim : true , 
    },
    path : {
        type : String , 
        default : '' , 
    },
    projectId : {
        type : mongoose.Schema.Types.ObjectId , 
        ref: "Project" , 
    } ,
    folderId : {
        type : mongoose.Schema.Types.ObjectId , 
        ref: "Folder" , 
    },
    content : {
        type : String , 
        default : '' ,
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId , 
        ref: "User" , 
    },
    createdAt : {
        type : Date , 
        default : Date.now , 
    },
    modifiedBy : {
        type : mongoose.Schema.Types.ObjectId , 
        ref: "User" , 
    },
    modifiedAt : {
        type : Date , 
        default : null , 
    }, 
}) ; 

module.exports = mongoose.model("File" , fileSchema ) ; 

