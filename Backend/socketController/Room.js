const Project = require("../models/Project");
const User = require("../models/User");
const File = require("../models/file");
const mongoose  = require("mongoose");

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

        const updatedProject = await Project.findByIdAndUpdate(
            projectId,
            {
                $addToSet: {
                    activeUsers: { user: userId, cursorColor: getRandomRGBColor() },
                }
            },
            { new: true } 
        )
        .populate('activeUsers.user')
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
        ).populate('activeUsers.user')
        .populate('admin').exec() 

        console.log("updated project passed " , updatedProject.activeUsers) ; 


        let saved = false ; 

        if(updatedProject.activeUsers.length === 0 ){

            saved = true ; 

            await Promise.all(

                changedFiles.map(async (file) => {

                    const currfile = await File.findById(file._id);
                    if (!currfile) return;

                    currfile.content = file.content;
                    currfile.modifiedAt = new Date();

                    await currfile.save();


                    const res = {
                        currfile,
                        type:'file',
                    }
                    socket.to(projectId).emit('fileChnagedSocketRes',res)
                })

            );
        }
console.log("SavED ALL FILES") ; 

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