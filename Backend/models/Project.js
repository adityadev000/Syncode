const mongoose = require("mongoose") ; 

const projectSchema = new mongoose.Schema({

    name : {
        type : String , 
        required : true , 
        trim : true , 
    } ,
    description : {
        type : String , 
        required : true , 
        maxlength : 100 , 
    } ,
    admin : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "User" , 
    },
    members : [
        {
            type : mongoose.Schema.Types.ObjectId , 
            ref : "User" , 
        }
    ],
    rootPath : {
        type : String , 
        trim : true , 
        default : "root/" , 
    } , 
    createdAt : {
        type : Date , 
        default : Date.now , 
    }, 
    folders : [
        {
            type : mongoose.Schema.Types.ObjectId , 
            ref : "Folder" , 
        }
    ],
    files : [
        {
            type : mongoose.Schema.Types.ObjectId , 
            ref : "File" , 
        }
    ],
}) ; 

module.exports = mongoose.model("Project" , projectSchema ) ; 

