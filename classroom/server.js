const { name } = require("ejs");
const express = require("express")
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
const sessionOption = {
    secret : "mysecretcode",
    resave :  false,
    saveUninitialized:true
};
app.use(session(sessionOption));
app.use(flash());

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
})
app.get("/register",(req,res)=>{
    let {name = "anonymous" } = req.query;
    req.session.name = name;
    if(name === "anonymous")
    req.flash("error","user not registerd ");
    else
    req.flash("success","registerd succesfully");

   
    res.redirect("/hello");
})
app.get("/hello",(req,res)=>{
    res.render("page.ejs",{name : req.session.name});
})
// app.get("/test",(req,res)=>{
//     res.send("testing session");
// })

// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }
//     else{
//         req.session.count =1;
//     }
//     res.send(`you sent req ${req.session.count} times`);
// })


app.listen(2000,()=>{
    console.log("server is listening to port 2000");
})

// const post = require("./routes/post.js");
// const user = require("./routes/user.js");

// const cookieParser = require("cookie-parser");
// app.use(cookieParser("signedCookie"));


// app.use("/users",user);
// app.use("/posts",post);


// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","namaste");
//     res.cookie("madein","India");
//     res.cookie("greet","hello");
//     res.cookie("madein","japan");
//     res.send("Hi cookie bol rha hu")
// })
// app.get("/",(req,res)=>{
//     console.dir(req.cookies);
//     res.send('server');
// })

// app.get("/greet",(req,res)  =>{
//     let  {name ="anonymous"} = req.cookies;
//     console.log(`Hi , ${name}`);
//     res.send(`Hi ${name}`)
// })
// app.get("/getsignedcookies",(req,res)=>{
//     res.cookie("made-in","India" , {signed : true});
//     res.send("get signed cookies");
// })

// app.get("/verify",(req,res)=>{

//     res.send("verify");
//     console.log(req.signedCookies);
    
// })

