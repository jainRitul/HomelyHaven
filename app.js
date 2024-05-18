if(process.env.NODE_ENV != "production"){
   require('dotenv').config()
}

//requring express
const express = require("express");
const app = express();
//require path for ejs
const path = require("path");
//requring mongoose for database
const mongoose = require("mongoose");
//require ejs mate
const ejsMate = require("ejs-mate");

//require method overrid
const methodOverride = require("method-override");
const exp = require("constants");
//require wrapAsync from utils for server side validation
const wrapAsync = require("./utils/wrapAsync.js");
//require expresserror class from  utils
const ExpressError = require("./utils/ExpressError.js");
//require schema from schmea.js
const { listingSchema ,reviewSchema } = require("./schema.js");

//require review model
const Review = require("./models/review.js");
const User = require("./models/user.js");
//requiring listing from models
const Listing = require("./models/listing.js")


const listingsRouter = require("./routes/listing.js");
const userRouter = require("./routes/user.js");
const reviewsRouter = require("./routes/review.js");

const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");


const sessionOptions = {
    secret : "mysupersecret",
    resave :  false,
    saveUninitialized:true,
    cookie : {
    expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge :  7 * 24 * 60 * 60 * 1000,
    httpOnly : true
    }
}

// //basic api
// app.get("/",(req,res)=>{
//     res.send("Hii ! , I am root");
// })

//database creation
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// const dbUrl = process.env.ATLASDB_URL;


// const dbUrl = process.env.ATLASDB_URL;
main().then(()=>{
    console.log("connection established");
}).catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(MONGO_URL);
}
// mongoose.connect(process.env.ATLASDB_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => {
//   console.log('Connected to MongoDB');
// })
// .catch((error) => {
//   console.error('Error connecting to MongoDB:', error);
// });


app.use(session(sessionOptions));
app.use(flash());

//using passport middleware for authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//setting the engine for view ejs
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(methodOverride("_method"));
//for parsing of data
app.use(express.urlencoded({extended:true}));
app.engine('ejs',ejsMate);
//for using public folder and static files
app.use(express.static(path.join(__dirname,"/public")));






//middleware for flash msg when new listing created
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

// //demouser
// app.get("/demouser",async (req,res)=>{
//     let fakeUser = new User({
//         email : "student@gmail.com",
//         username : "adam"
//     })
//     let registeredUser = await User.register(fakeUser,"helloworld");
//     res.send(registeredUser);
// })

app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter);

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found!"));
})
//middleware for error handling
app.use((err,req,res,next)=>{
    let{statusCode=500,message="Something went wrong"} = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs",{message});
})


 
//listening port
app.listen(8080,()=>{
    console.log(`server is listening on port 8080`);
})



















// //inserting data
// app.get("/testListing",async (req,res)=>{
   
//     let sampleListing = new Listing({
//         title : "My new villa",
//         description : "By the beach",
//         price : 1200,
//         location : "Calangute ,Goa",
//         country : "India"
//     })
//     await sampleListing.save();
    
//     console.log("Sample was saved");
//     res.send("Successful Listing ");
// })

