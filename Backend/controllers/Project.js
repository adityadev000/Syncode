const Project = require("../models/Project");
const Folder = require("../models/folder") ; 
const File = require("../models/file") ;
const User = require("../models/User");

async function populatedFolders(folderId) {
    
    const folder = await Folder.findById(folderId)
    ?.populate("files")
    ?.populate("folders")


    if(!folder ){
        return null ; 
    }

    const populatedSubFolders = await Promise.all(
        folder?.folders?.map(subfolder => populatedFolders(subfolder._id))

    )

    folder.folders= populatedSubFolders ; 

    return folder ; 

}

async function getPopulatedProject(projectId) {

    const project = await Project.findById(projectId)?.populate("files") ; 
    
    const populatedFolders = await Promise.all(
        project?.folders.map(folderId => populatedFolders(folderId))  
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
        const file= File.findById(fileId) ; 

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