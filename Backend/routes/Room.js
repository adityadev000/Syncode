const express = require("express") ;
const router = express.Router() ;

const {auth} = require("../middlewares/auth") ; 

const {
    createRoom,
    joinByRoomId,


} = require("../controllers/Room") ; 

router.post("/createRoom" , auth , createRoom) ; 
router.post("/joinByRoomId" , auth , joinByRoomId) ; 

module.exports = router ; 