const Project = require("../models/Project");
const projectPassword = require("../models/projectPassword");
const User = require("../models/User");


exports.createRoom = async (req ,res) => { 

    try{
        const {projectId  ,permission} = req.body ; 

        if(!projectId ){
            return res.status(400).json({
                success : false , 
                message : 'Please provide all details',  
            })
        }

        let password = Math.floor(10000000 + Math.random() * 90000000).toString() ;  
        if(permission === 'readOnly'){
            password += "R" ; 
        }
        else{
            password += 'W'
        }
        const response = await projectPassword.create({
            projectId , 
            password ,
        }) ; 

        return res.status(200).json({
            success : true , 
            message : 'Room created successfully',
            data : response ,  
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

exports.joinByRoomId = async (req ,res) => { 

    try{
        const {projectId , password } = req.body ; 
        const userId = req.user.id ; 
        let perm = password[password.length-1] ; 
        if(perm === 'R'){
            perm = "read" ; 
        }
        else{
            perm = "write" ; 
        }

        const record = await projectPassword.findOne({
            projectId: projectId,
            password: password
        });

        if (!record) {
            return res.status(200).json({
                success : false , 
                message : 'No matching project password found or it has expired', 
            })
        }
        //if user is already present . 
        const isAdmin = await Project.findOne({
            _id : projectId , 
            admin : userId , 
        })

        if(isAdmin){
            return res.status(200).json({
                success : false , 
                message : 'you are already a member of this project', 
            })
        }

        const member = await Project.findOne({
            _id : projectId , 
            members : {
                $elemMatch: { user: userId } 
            } ,
        })
        const role = await Project.findOne({
            _id : projectId , 
            members : {
                $elemMatch: { user: userId, permission: perm }
            } ,
        })

        console.log("member" , member ) ; 
        console.log("role" , role ) ; 
        //if user present chk for role 
        if(member && role ){
            return res.status(200).json({
                success : false , 
                message : 'you are already a member of this project', 
            })
        }   
        else if(member && role === null ){
            const userMember = member.members.find(m => m.user.toString() === userId);
            if (userMember) {
                userMember.permission = perm; // update the permission
                await member.save();

                return res.status(200).json({
                    success: true,
                    message: "Your role has been updated",
                    members: member.members, // send updated members array
                });
            } else {
                return res.status(404).json({ success: false, message: "User not found in project members" });
            }
        }
        else{
            //you are a new user 
            const updatedUser = await User.findByIdAndUpdate(
                userId , 
                {
                    $push:{
                        projectCollaborated : projectId ,
                    }
                }
            )

            const updatedProject = await Project.findByIdAndUpdate(
                projectId , 
                {
                    $push : {
                        members :  {
                            user : userId , 
                            permission : perm ,
                        } 
                    }
                }
            )
            return res.status(200).json({
                success : true , 
                message : 'Room joined Successfully', 
            })
        }
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