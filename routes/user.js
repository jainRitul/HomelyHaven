const express  = require("express");
const router = express.Router({mergeParams : true});
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { route } = require("./listing.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

//signup
router.route("/signup")
  .get(userController.renderSignupFrom)
  .post(wrapAsync(userController.signup));



//login
router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(saveRedirectUrl
  ,passport.authenticate("local",
  {
    failureRedirect : "/login",
    failureFlash : true
  }),
  userController.login);


//logout route
router.get("/logout",userController.logout);

module.exports  = router;