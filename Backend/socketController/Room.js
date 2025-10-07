const Project = require("../models/Project");
const User = require("../models/User");
const File = require("../models/file");
const mongoose  = require("mongoose");
const Folder = require("../models/folder");
const { getPopulatedProject } = require("../config/Helper/getPopulatedProject");


function getRandomRGBColor() {
    const randColor = () => Math.floor(Math.random() * 100) + 50; // Generates 50–149
    const r = randColor();
    const g = randColor();
    const b = randColor();
    return `rgb(${r}, ${g}, ${b})`;
}

exports.handleJoinRoom = async (data , socket) => { 
    try {
        const { projectId, userId } = data; 

        if(!projectId || !userId){
            return ; 
        }
        await Project.updateOne(
            { _id: projectId, "activeUsers.user": { $ne: userId } }, // only if userId not in array
            { $push: { activeUsers: { user: userId, cursorColor: getRandomRGBColor() } } }
            ,{new : true } , 
        )
        
        const updatedProject = await Project.findById(projectId)
        .populate('activeUsers.user')
        .populate('members.user')
        .populate('admin')
        .exec();

        socket.join(projectId);
        
        const user = await User.findById(userId);

        const body = {
            newUser: `${user.firstName} ${user?.lastName}`,
            project: updatedProject,
            newUserDetails: user,
        };
        
        // Notify everyone else in the room
        socket.to(projectId).emit('user-join-room', body);

        // Also notify the current user
        socket.emit('user-join-room', body); 
    } 
    catch (err) {
        console.log(err.message);
        console.log('Some Problem in socket io handler join room');
    }
}

exports.handleLeaveRoom = async (data , socket ) => { 

    try{
        const {projectId , userId , changedFiles} = data ;
        const updatedProject = await Project.findByIdAndUpdate(projectId , 
            {
                $pull : {
                    activeUsers  : { user: userId }
                }
            },
            {new : true } ,
        )
        .populate('activeUsers.user')
        .populate('members.user')
        .populate('admin')
        .exec() 



        let saved = false ; 

        if(updatedProject.activeUsers.length === 0 ){


            saved = true ; 

            await Promise.all(

                changedFiles.map(async (file) => {

                    const currfile = await File.findByIdAndUpdate(file.fileId , 
                        {
                            content : file.content ,
                            modifiedAt : new Date(), 
                        } , 
                        {new : true } ,
                    )


                    const res = {
                        currfile,
                        type:'file',
                    }
                    socket.to(projectId).emit('fileChnagedSocketRes',res) ;
                })

            );
        }


        const user = await User.findById(userId);

        const body = {
            newUser:`${user.firstName} ${user?.lastName}`,
            project:updatedProject,
            saved ,
        }
        socket.to(projectId).emit('user-leave-room',body);
        socket.leave(projectId);

    }
    catch(err){
        console.error(err.message);
        console.log('Some Error Occurred in Socket Io handler leave room'); 
    }
}

exports.handleProjectSync = async (data , socket) => { 

    try{
        const {projectId} = data ; 

        if(!projectId ){
            return ; 
        }

        const project = await getPopulatedProject(projectId) ; 

        socket.join(projectId);

        const body = {
            updatedProject : project , 
        }

        socket.to(projectId).emit('project-updated-details', body);

        socket.emit('project-updated-details', body); 


    }
    catch(err){
        console.log(err.message);
        console.log('Some Problem in socket io handler to sync project');
    }
}