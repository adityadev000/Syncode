const User = require("../models/User");
const { deleteImageToCloudinary, uploadImageToCloudinary } = require("../utils/cloudinary");
const Project = require("../models/Project") ;

exports.changeAvtar = async (req ,res) => { 

    try{
        console.log("uploading") ; 
        const {avtar} = req.files ;
        const userId = req.user.id ; 

        console.log("avtar" , avtar) ;
        console.log("userid" , userId) ;


        const user = await User.findById(userId) ; 
        const iamge_url = user.avtarUrl ; 

        if(iamge_url !== "" || iamge_url !== undefined) {
            await deleteImageToCloudinary(iamge_url) ; 
        }
        console.log("Deletion success") ;

        const image = await uploadImageToCloudinary(
            avtar , 
            process.env.FOLDER_NAME , 
            1000 ,
            1000,
        )
        console.log("Upload success") ; 

        const updatedUser = await User.findByIdAndUpdate(
            userId , 
            {avtarUrl : image.secure_url} , 
            {new : true } 
        )

        console.log("user updated return rps") ;

        return res.status(200).json({
            success : true , 
            message : 'Profile picture changed sucessfully',
            user : updatedUser , 
        })
    }
    catch(err){
        console.error(err) ; 
        return res.status(500).json({
            success : false , 
            message : 'failed to update dp ' , 
            error : err.message  ,
        })
    }
}

exports.updateProfile = async (req ,res) => { 

    try{
        const {firstName , lastName , userName , bio , gender } = req.body ; 
        const userId = req.user.id ; 

        let user = await User.findById(userId) ; 
        
        if(firstName){
            user.firstName = firstName ; 
        }
        if(lastName){
            user.lastName = lastName ; 
        }
        if(userName){
            const existingUser = await User.findOne({ userName });
            if(existingUser){
                return res.status(200).json({
                    success : false , 
                    message : 'userName already Taken', 
                })
            }
            user.userName = userName ; 
        }
        if(bio){
            user.bio = bio ; 
        }
        if(gender){
            user.gender = gender ; 
        }

        await user.save() ; 

        return res.status(200).json({
            success : true , 
            message : 'Profile Updated SuccessFully', 
        })
    }
    catch(err){
        console.error(err) ; 
        return res.status(500).json({
            success : false , 
            message : 'ISE' , 
            error : err.message  ,
        })
    }
}


exports.getUserDetails = async (req ,res) => { 

    try{
        const userId = req.user.id ; 
        const user = await User.findById(userId)
        .populate("projectCreated")
        .populate({
            path : "projectCollaborated" , 
            populate : {
                path : "admin"
            }
        })
        .exec() ; 

        return res.status(200).json({
            success : true , 
            message : 'User return Successfully',
            user 
        })


    }
    catch(err){
        console.error(err) ; 
        return res.status(500).json({
            success : false , 
            message : 'ISE' , 
            error : err.message  ,
        })
    }
}