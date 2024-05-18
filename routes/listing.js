const express  = require("express");
const router = express.Router();
//require wrapAsync from utils for server side validation
const wrapAsync = require("../utils/wrapAsync.js");
//require schema from schmea.js
const { listingSchema } = require("../schema.js");
//require expresserror class from  utils
const ExpressError = require("../utils/ExpressError.js");
//requiring listing from models
const Listing = require("../models/listing.js")
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");

const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })


router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn,
       
        upload.single('listing[image]'), validateListing,
        wrapAsync (listingController.createListing));
    

    
//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner,wrapAsync(listingController.destroyListing));



//edit
router.get("/:id/edit", isLoggedIn, isOwner,wrapAsync(listingController.renderEditForm));



module.exports = router;  
