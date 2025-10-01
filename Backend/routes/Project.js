const express = require("express") ;
const router = express.Router() ;

const {auth} = require("../middlewares/auth") ; 

const {
    getProjectDetails,
    getFileContent , 
    createProject,
    renameProjectName,
    renameFileName,
    renameFolderName,
    createFolder,
    createFile,
    deleteFile,
    deleteFolder,
    saveAllFile,
    addActiveUser,
    removeActiveUser,
    deleteProject,


} = require("../controllers/Project") ; 

router.post("/getProjectDetails" , auth , getProjectDetails) ; 
router.post("/getFileContent" , auth , getFileContent) ; 
router.post("/createProject" , auth , createProject) ; 
router.post("/renameProjectName" , auth , renameProjectName) ; 
router.post("/renameFileName" , auth , renameFileName) ; 
router.post("/renameFolderName" , auth , renameFolderName) ; 
router.post("/createFolder" , auth , createFolder) ; 
router.post("/createFile" , auth , createFile) ; 
router.post("/deleteFile" , auth , deleteFile) ; 
router.post("/deleteFolder" , auth , deleteFolder) ; 
router.post("/saveAllFile" , auth , saveAllFile) ; 
router.post("/addActiveUser" , auth , addActiveUser) ; 
router.post("/removeActiveUser" , auth , removeActiveUser) ; 
//remove this later
router.post("/deleteProject"  , deleteProject) ; 

module.exports = router ; 