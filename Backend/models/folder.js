const mongoose = require("mongoose") ;

const folderSchema = new mongoose.Schema({
    name : {
        type : String , 
        trim : true , 
        required : true , 
    } , 
    type : {
        type : String , 
        default : 'Folder'
    },
    path : {
        type : String , 
        default : '' ,  
    },
    projectId : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'Project' ,
        required : true , 
    } , 
    createdBy : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'User' ,
        required : true , 
    },
    
    createdAt : {
        type : Date , 
        default : Date.now ,
    },
    parentFolderDirectory : {
        type : String , 
        default : "", 
    },
    parentFolder : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'Folder' ,
    },
    folders : [
        {
            type : mongoose.Schema.Types.ObjectId , 
            ref : 'Folder' ,
        }
    ],
    files : [
        {
            type : mongoose.Schema.Types.ObjectId , 
            ref : 'File' ,
        }
    ],
});

module.exports = mongoose.model("Folder" , folderSchema ) ;