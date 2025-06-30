const jwt = require("jsonwebtoken") ; 
require("dotenv").config() ; 

exports.auth = async (req ,res , next ) => { 

    try{
        const authHeader = req.header("Authorization") || req.header("authorization") ; 

        const token = req.cookies.token || req.body.token || (authHeader ? authHeader.replace("Bearer " , "") : null ) ; 

        if(!token ){
            return res.status(401).json({
                success : false , 
                message : 'Token is missing', 
            })
        }

        try{
            const decode = jwt.verify(token , process.env.JWT_SECRET) ; 

            req.user = decode ; 
        }
        catch(err){
            console.error(err) ; 
            return res.status(401).json({
                success : false , 
                message : "token is invalid" , 
            });
        }

        next() ; 
    }
    catch(err){
        console.error(err) ; 
        return res.status(500).json({
            success : false , 
            message : 'Something went wrong while validating the token' , 
            error : err.message  ,
        })
    }
}