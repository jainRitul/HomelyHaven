const Listing = require("./models/listing.js");
//require schema from schmea.js
const { listingSchema } = require("./schema.js");
//require expresserror class from  utils
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./models/review.js");

//require schema from schmea.js
const { reviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (req,res,next)=>{
    console.log(req);
    if(!req.isAuthenticated()){
        req.session.redirectUrl =  req.originalUrl;
        req.flash("error","you must be logged in for create listing");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
    
}
module.exports.isOwner =async (req,res,next) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!(listing.owner._id.equals(res.locals.currUser._id))){
         req.flash("error","you are not the owner of listing");
         return  res.redirect(`/listings/${id}`);
    }
    next();
}
module.exports.isReviewAuthor =async (req,res,next) =>{
    let {id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!(review.author._id.equals(res.locals.currUser._id))){
         req.flash("error","you are not the author of review");
         return  res.redirect(`/listings/${id}`);
    }
    next();
}


//validateListing
module.exports.validateListing = (req,res,next) =>{
    let {error} = listingSchema.validate(req.body);
     
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
}

//server side validation of review through joi
module.exports.validateReview = (req,res,next) =>{
    let {error} = reviewSchema.validate(req.body);
     
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
}