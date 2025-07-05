const express = require("express") ;
const router = express.Router() ;

const {auth} = require("../middlewares/auth") ; 

const {
    getProjectDetails,
    getFileContent , 
    createProject,

} = require("../controllers/Project") ; 

router.post("/getProjectDetails" , auth , getProjectDetails) ; 
router.post("/getFileContent" , auth , getFileContent) ; 
router.post("/createProject" , auth , createProject) ; 

module.exports = router ; 