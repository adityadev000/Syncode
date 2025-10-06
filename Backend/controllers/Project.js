const Project = require("../models/Project");
const Folder = require("../models/folder") ; 
const File = require("../models/file") ;
const User = require("../models/User");
const mongoose = require("mongoose");
const { getPopulatedProject } = require("../config/Helper/getPopulatedProject");


exports.getProjectDetails = async (req ,res) => { 

    try{
        const {projectId} = req.body ; 

        const project = await getPopulatedProject(projectId) ; 


        return res.status(200).json({
            success : true , 
            message : 'Project returned Successfully',
            project
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

exports.getFileContent = async (req ,res) => { 

    try{
        const{fileId} = req.body ; 



        const file= await File.findById(fileId) ; 

        if(!file){
            return res.status(400).json({
                success : false , 
                message : 'file Content cannot be fetched', 
            })
        }
        return res.status(200).json({
            success : true , 
            message : 'File fetched ', 
            file , 
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

exports.createProject = async (req ,res) => { 

    try{
        const {name , description} = req.body ; 
        const userId = req.user.id ; 

        const project = await Project.create({
            name : name , 
            description : description , 
        })

        const updatedProject = await Project.findByIdAndUpdate(project._id , 
            {
                $push : {
                    admin : userId , 
                }
            },
            {new : true } ,
        )
        const user = await User.findByIdAndUpdate(userId ,
            {
                $push : {
                    projectCreated : project._id , 
                }
            }
        )
        if(!updatedProject || !user ){
            return res.status(200).json({
                success : false , 
                message : 'Project Creation Failed', 
            })
        }

        return res.status(200).json({
            success : true , 
            message : 'Project Created Successfully',
            project : updatedProject , 
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


exports.renameProjectName = async (req ,res) => { 

    try{
        const {name , projectId} = req.body ; 
        const project = await Project.findById(projectId) ; 
        project.name  = name ; 

        await project.save() ; 

        return res.status(200).json({
            success : true , 
            message : 'Project Name Renamed', 
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
exports.renameFileName = async (req ,res) => { 

    try{
        const {name , fileId} = req.body ; 
        const file = await File.findByIdAndUpdate(
            fileId , 
            {
                name : name , 
            },
            {
                new : true 
            }
        )

        return res.status(200).json({
            success : true , 
            message : 'File Name Renamed', 
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

exports.renameFolderName = async (req ,res) => { 

    try{
        const {name , folderId} = req.body ; 
        const folder = await Folder.findByIdAndUpdate(
            folderId , 
            {
                name : name , 
            },
            {
                new : true 
            }
        )

        return res.status(200).json({
            success : true , 
            message : 'Folder Name Renamed', 
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

exports.createFolder = async (req ,res) => { 

    try{
        const {name , path , projectId } = req.body ; 
        const userId = req.user.id ; 

        if(!name || !path || !projectId || !userId ){
            return res.status(200).json({
                success : false , 
                message : 'All fields are required', 
            })
        }

        const currPath = path + `/${name}` ; 
        
        let parentFolder = null ;

        if(path !== 'root') {
            parentFolder = await Folder.findOne({path : path } ) ; 
        }

        const user = await User.findById(userId) ; 

        const folder = await Folder.create({
            name,
            path : currPath , 
            projectId : projectId,
            createdBy : user._id , 
            parentFolderDirectory : path , 
            parentFolder : parentFolder ,
        })

        if(parentFolder !== null ){
            await Folder.findByIdAndUpdate(
                parentFolder._id , 
                {
                    $push : {
                        folders : folder._id , 
                    }
                },
                {new : true } , 
            )
        }

        await Project.findByIdAndUpdate(
            projectId , 
            {
                $push : {
                    folders : folder._id , 
                }
            },
            {new : true}  , 
        )


        return res.status(200).json({
            success : true , 
            message : 'Folder created Successfully',
            folder , 
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

exports.createFile = async (req ,res) => { 

    try{
        const {name , path , projectId } = req.body ; 
        const userId = req.user.id ; 

        if(!name || !path || !projectId || !userId ){
            return res.status(200).json({
                success : false , 
                message : 'All fields are required', 
            })
        }

        const currPath = path + `/${name}` ; 
        
        let parentFolder = null ;

        if(path !== 'root') {
            parentFolder = await Folder.findOne({path : path } ) ; 
        }

        const user = await User.findById(userId) ; 

        const file = await File.create({
            name,
            path : currPath , 
            projectId : projectId,
            createdBy : user._id , 
            content : "" , 
            parentFolderDirectory : path , 
            parentFolder : parentFolder ,
        })

        if(parentFolder !== null ){
            await Folder.findByIdAndUpdate(
                parentFolder._id , 
                {
                    $push : {
                        files : file._id , 
                    }
                },
                {new : true } , 
            )
        }

        await Project.findByIdAndUpdate(
            projectId , 
            {
                $push : {
                    files : file._id , 
                }
            },
            {new : true}  , 
        )


        return res.status(200).json({
            success : true , 
            message : 'file created  Successfully',
            file , 
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


exports.deleteFile = async (req ,res) => { 

    try{
        const {fileId , parentFolder , projectId } = req.body ; 
        const userId = req.user.id ; 

console.log("parentFolder " , parentFolder) ; 
        if(parentFolder !== undefined ){
            await Folder.findByIdAndUpdate(
                parentFolder, 
                {
                    $pull : {
                        files : fileId , 
                    }
                },
                {new : true } , 
            )
        }
console.log("remove parent folder passed") ; 
        await Project.findByIdAndUpdate(
            projectId , 
            {
                $pull : {
                    files : fileId , 
                }
            },
            {new : true}  , 
        )
console.log("remove from project file passed") ;
        await File.findByIdAndDelete(fileId) ;  
console.log("file deletd") ;

        return res.status(200).json({
            success : true , 
            message : 'file Deleted Successfully',
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

const deleteAllFolder = async (folder , projectId) => {

    if(folder === undefined ){
        return ; 
    }


    if(folder?.folders?.length > 0 ){

        for(const subFolderId of folder?.folders){
            const subFolder = await Folder.findById(subFolderId);
            await deleteAllFolder(subFolder , projectId) ; 
        }
    }

    //delete all files in folder and after delete this folder also. 

    if(folder?.files?.length > 0 ){
        for(const fileId of folder?.files) {
            await Project.findByIdAndUpdate(projectId ,
                {
                    $pull : {
                        files : fileId , 
                    }
                },
                {new : true}  , 
            )
            await File.findByIdAndDelete(fileId) ;
        }
    }


    //delete the current folder. 
    await Project.findByIdAndUpdate(projectId ,
            {
                $pull : {
                    folders : folder._id , 
                }
            },
            {new : true}  , 
        )
    await Folder.findByIdAndDelete(folder._id) ;

}
exports.deleteFolder = async (req ,res) => { 

    try{
        const {folderId , parentFolder , projectId } = req.body ; 
        const userId = req.user.id ; 

        if(folderId === undefined ){
            return res.status(200).json({
                success : "false" , 
                message : 'folderId is Undefined', 
            })
        }
        console.log("folder iD " , folderId ) ; 
        const mainFolder = await Folder.findById(folderId).populate("folders").populate("files").exec() ; 

        await deleteAllFolder(mainFolder , projectId) ; 


        console.log("main folder = " , mainFolder ) ; 
        
        if(parentFolder !== undefined  ){
            await Folder.findByIdAndUpdate(
                parentFolder , 
                {
                    $pull : {
                        folders : folderId , 
                    }
                },
                {new : true } , 
            )
        }

        return res.status(200).json({
            success : true , 
            message : 'Folder Deleted Successfully',

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

// exports.saveAllFile = async (req ,res) => { 

//     try{
//         const  {changedFiles}  = req.body; 
//         console.log("changedFiles " , changedFiles ) ;

//         if( changedFiles.length === 0 ) {
//             return res.status(200).json({
//                 success : false , 
//                 message : 'no files are changed', 
//             })
//         }
//         await Promise.all(

//             changedFiles.map(async (file) => {
//                 const currfile = await File.findById(file.fileId);
//                 if (!currfile) return;

//                 currfile.content = file.content;
//                 currfile.modifiedAt = new Date();

//                 await currfile.save();
//             })
//         );

//         console.log("saved All files") ; 
//         return res.status(200).json({
//             success : true , 
//             message : 'All files are saved successfully', 
//         })
//     }
//     catch(err){
//         console.error(err) ; 
//         return res.status(500).json({
//             success : false , 
//             message : 'ISE' , 
//             error : err.message  ,
//         })
//     }
// }


// exports.addActiveUser = async (req ,res) => { 
//     try{
//         const {projectId } = req.body ; 
//         const userId = req.user.id; 

//         const randomColor = `rgb(${Math.floor(Math.random()*200)+55},${Math.floor(Math.random()*200)+55},${Math.floor(Math.random()*200)+55})`;
//         const updatedProject = await Project.findByIdAndUpdate(projectId , 
//             {
//                 $addToSet : {
//                     activeUsers : {user: userId, cursorColor: randomColor } ,
//                 }
//             },
//             {new : true } 
//         )


//         return res.status(200).json({
//             success : true , 
//             message : 'Added to active member',
//             project : updatedProject ,
//         })
        
//     }
//     catch(err){
//         console.error(err) ; 
//         return res.status(500).json({
//             success : false , 
//             message : 'ISE' , 
//             error : err.message  ,
//         })
//     }
// }

// exports.removeActiveUser = async (req ,res) => { 

//     try{
//         const {projectId} = req.body ; 
//         const userId = req.user.id ; 

//         const updatedProject = await Project.findByIdAndUpdate(projectId , 
//             {
//                 $pull : {
//                     activeUsers  : { user: userId }
//                 }
//             },
//             {new : true } 
//         )
//         return res.status(200).json({
//             success : true , 
//             message : 'user removed from active user',
//             project : updatedProject  
//         })
//     }
//     catch(err){
//         console.error(err) ; 
//         return res.status(500).json({
//             success : false , 
//             message : 'ISE' , 
//             error : err.message  ,
//         })
//     }
// }

























//remove this later 
exports.deleteProject = async (req ,res) => { 

    try{

        const p = "68694c639b0764e03169e2bd";
        const projectId = new mongoose.Types.ObjectId(p);
        const a = "6861737b5cdd7a3c4f82d220";
        const admin = new mongoose.Types.ObjectId(a);
        await User.findByIdAndUpdate( admin, 
            {
                $pull : {
                    projectCreated : projectId , 
                }
            }
        )
        const m = "68d90b5037d5ceea7ed9eea1";
        const member = new mongoose.Types.ObjectId(m);
            await User.findByIdAndUpdate(member, {
                $pull: { projectCollaborated: projectId },
            });

        await Project.findByIdAndDelete(projectId) ; 

        return res.status(200).json({
            success : true , 
            message : 'project Deleted ', 
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