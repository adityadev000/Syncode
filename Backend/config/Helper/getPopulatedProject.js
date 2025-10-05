
const Project = require("../../models/Project");
const { populateFolderRecursively } = require("./populateFolderRecursively");



async function getPopulatedProject(projectId)  {

    const project = await Project.findById(projectId)?.populate("files").populate("folders").exec() ; 
    
    const populatedFolders = await Promise.all(
        project?.folders.map(folderId => populateFolderRecursively(folderId))  
    )
    
    if(populatedFolders.length > 0 ){
        project.folders= populatedFolders ; 
        
    }

    return project ; 
}

module.exports = { getPopulatedProject };