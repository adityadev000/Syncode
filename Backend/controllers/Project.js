const Project = require("../models/Project");
const Folder = require("../models/folder") ; 
const File = require("../models/file") ;
const User = require("../models/User");

async function populateFolderRecursively(folderId) {

    const folder = await Folder.findById(folderId)
    ?.populate("files")
    ?.populate("folders")


    if(!folder ){
        return null ; 
    }

    const populatedSubFolders = await Promise.all(
        folder?.folders?.map(subfolder => populateFolderRecursively(subfolder._id))

    )

    folder.folders= populatedSubFolders ; 

    return folder ; 

}

async function getPopulatedProject(projectId) {

    const project = await Project.findById(projectId)?.populate("files") ; 
    
    const populatedFolders = await Promise.all(
        project?.folders.map(folderId => populateFolderRecursively(folderId))  
    )
    
    if(populatedFolders.length > 0 ){
        project.folders= populatedFolders ; 
    }

    return project ; 
}
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

exports.getProjectsCreted = async (req ,res) => { 

    try{
        
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
        const project = await Project.findByIdAndUpdate(
            projectId , 
            {
                name : name , 
            },
            {
                new : true 
            }
        )

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
            deleteAllFolder(subFolder , projectId) ; 
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
        const mainFolder = await Folder.findById(folderId) ; 
        console.log("main folder = " , mainFolder ) ; 
        deleteAllFolder(mainFolder , projectId) ; 

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

exports.saveFile = async (req ,res) => { 

    try{
        const {fileId , code} = req.body ;  

        const updatedFile = await File.findByIdAndUpdate(fileId , 
            {content : code } , 
            {new : true } 
        )

        return res.status(200).json({
            success : true , 
            message : 'file saved successfully', 
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