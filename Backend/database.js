require("dotenv").config();
const{MongoClient,ServerApiVersion}=require("mongodb")

const url=process.env.MONGODB_URL || "mongodb://localhost:27017/";

const options={
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
        }
};


let client ;
const  ConnectToMongoDB=async()=>{
    if(!client){
        try {
            client=await MongoClient.connect(url,options)
            console.log("Connected to MongoDb")
        } catch (error) {
            console.log(error)
        }
    }

}


const getConnectedClient =()=>client;

module.exports={ConnectToMongoDB,getConnectedClient}