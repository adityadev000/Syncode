const mongoose = require('mongoose') ; 

const projectPasswordSchema = new mongoose.Schema({

    projectId : {
        type : String ,
        required : true , 
    } , 
    password : {
        type : String , 
        required : true , 
    },
    createdAt : {
        type : Date,
        default : Date.now , 
        expires : 5 * 60 ,
    },
});

module.exports = mongoose.model("ProjectPassword" , projectPasswordSchema ) ;