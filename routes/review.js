const express  = require("express");
const router = express.Router({mergeParams : true});

//require wrapAsync from utils for server side validation
const wrapAsync = require("../utils/wrapAsync.js");

//require expresserror class from  utils
const ExpressError = require("../utils/ExpressError.js");

//require schema from schmea.js
const { reviewSchema } = require("../schema.js");

//require review model
const Review = require("../models/review.js");

//requiring listing from models
const Listing = require("../models/listing.js")


const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");



//Reviews
//Post req for adding review to database for particular lisitng
router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.createReview));


//delete review
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.destroyReview));


module.exports = router;