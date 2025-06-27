const express = require("express") ; 
const app = express();
const dotenv = require("dotenv") ;
const cors = require("cors") ;
const database = require("./config/database")


dotenv.config() ; 
const PORT = process.env.PORT || 4000 ; 

//databse connection
database.connect() ; 

//middleware
app.use(express.json()) ; 


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