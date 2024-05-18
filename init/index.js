const mongoose = require("mongoose");
//require data.js from init folder
const initData = require("./data.js")
//rewuire lsting from models 
const Listing = require("../models/listing.js");

//database creation
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("connection established");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_URL);
}

let initDB =  async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=> ({...obj,owner : "65d1caa9342ead137af059a3"}));
    await Listing.insertMany(initData.data);
    console.log("Data was initalized");
}
initDB();