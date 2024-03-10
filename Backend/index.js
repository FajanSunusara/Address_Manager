require("dotenv").config();
const express =require("express");
const {ConnectToMongoDB}=require("./database")
const path=require("path");

const app=express();
app.use(express.json());
app.use(express.static (path.join(__dirname, "dist")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/index.html"));
    })
const router =require("./routes");

// app.get("/hello",(req,res)=>{
//     res.status(200).json({msg : "Hello world"});
// });
app.use("/api",router);

const port = process.env.PORT || 5000;
async function startServer(){
    await ConnectToMongoDB()
    app.listen(port,()=>{
        console.log(`server is listneing on http://localhost:${port}`);
    })
    
    
}
startServer()

