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


} = require("../controllers/Project") ; 

router.post("/getProjectDetails" , auth , getProjectDetails) ; 
router.post("/getFileContent" , auth , getFileContent) ; 
router.post("/createProject" , auth , createProject) ; 
router.post("/renameProjectName" , auth , renameProjectName) ; 
router.post("/renameFileName" , auth , renameFileName) ; 
router.post("/renameFolderName" , auth , renameFolderName) ; 

module.exports = router ; 