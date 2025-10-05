const Folder = require('../../models/folder')


async function populateFolderRecursively(folderId) {

    const folder = await Folder.findById(folderId)
    ?.populate("files")
    ?.populate("folders")
    .exec() ; 


    if(!folder ){
        return null ; 
    }

    const populatedSubFolders = await Promise.all(
        folder?.folders?.map(subfolder => populateFolderRecursively(subfolder._id))

    )

    folder.folders= populatedSubFolders ; 

    return folder ; 

}

module.exports = { populateFolderRecursively };
