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


dotenv.config() ; 
const PORT = process.env.PORT || 4000 ; 

//databse connection
database.connect() ; 

//middleware
app.use(express.json()) ; 
app.use(cookieParser()) ;
app.use(
    cors({
        origin : "https://syncode-lovat.vercel.app" , 
        credentials : true , 
    })
)
app.use(
    fileUplaod({
        useTempFiles : true , 
        tempFileDir : "/tmp/" 
    })
)
cloudinaryConnect() ;

app.use("/api/v1/user" , userRoutes) ;
app.use("/api/v1/project" , projectRoutes) ;


//default route
app.get("/" , (req, res) => {
    return res.json({
        success : true   , 
        message : 'Your server is up and Running...', 
    }) ;
}) ; 


//activate server
app.listen(PORT , () => {
    console.log(`App is running at port ${PORT}`) 
})

app.get("/hello", (req, res) => {
    res.send("Hello, World!");
});