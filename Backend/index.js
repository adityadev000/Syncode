const express = require("express") ; 
const app = express();
const dotenv = require("dotenv") ;
const cors = require("cors") ;
const database = require("./config/database") ; 
const cookieParser = require("cookie-parser") ; 
const {cloudinaryConnect} = require("./config/cloudinary") ;
const fileUplaod = require("express-fileupload") ; 
const userRoutes = require("./routes/User") ; 
const projectRoutes = require("./routes/Project") ; 
const roomRoutes = require("./routes/Room") ; 
const setUpSocketIo = require("./config/socketIOconfig") ; 
const http = require('http');


dotenv.config() ; 
const PORT = process.env.PORT || 4000 ; 

//databse connection
database.connect() ; 

//middleware
app.use(express.json()) ; 
app.use(cookieParser()) ;
app.use(
    cors({
        // origin : "https://syncode-lovat.vercel.app" , 
        origin : process.env.FRONTEND_URL , 
        credentials : true , 
    })
)
app.use(
    fileUplaod({
        useTempFiles : true , 
        tempFileDir : "/tmp/" 
    })
)


const server = http.createServer(app);
setUpSocketIo(server);


cloudinaryConnect() ;
app.use("/api/v1/user" , userRoutes) ;
app.use("/api/v1/project" , projectRoutes) ;
app.use("/api/v1/room" , roomRoutes) ;


//default route
app.get("/" , (req, res) => {
    return res.json({
        success : true   , 
        message : 'Your server is up and Running...', 
    }) ;
}) ; 


//activate server
server.listen(PORT , () => {
    console.log(`App is running at port ${PORT}`) 
})

app.get("/hello", (req, res) => {
    res.send("Hello, World!");
});