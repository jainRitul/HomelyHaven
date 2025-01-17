const Listing = require("../models/listing");

//index route
module.exports.index = async (req,res)=>{
    const allListings =  await Listing.find({});
    res.render("./listings/index.ejs", {allListings});
}


//new listing form
module.exports.renderNewForm = (req,res)=>{
    res.render("./listings/new.ejs");
}


//show listing
module.exports.showListing = async (req,res)=>{

    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({
      path:"reviews",
      populate:{
        path:"author"
      },
    })
    .populate("owner");
    if(!listing){
      req.flash("error","Listing you requested does not exsists");
      res.redirect("/listings");
    }
    // console.log(listing);
    res.render("./listings/show.ejs",{listing});
};

//creatr listing
module.exports.createListing = async (req,res,next)=>{
  

    let url = req.file.path;
    let filename = req.file.filename;
    // console.log(url , "...",filename);
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url , filename } ;
    
    await newListing.save();
    req.flash("success","New Listing Created !");
    res.redirect("/listings");
};

//edit listing
module.exports.renderEditForm = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","listing you requested for dose not exsists");
        res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");

    res.render("./listings/edit.ejs",{listing,originalImageUrl});
};


//update listing
module.exports.updateListing = async (req,res)=>{
     
    let {id} = req.params;
   
    let listing =  await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof req.file != "undefined"){
            let url = req.file.path;
            let filename = req.file.filename;
            listing.image = { url , filename } ;
            await listing.save();
    }
    req.flash("success","listing updated");
    res.redirect(`/listings/${id}`);
};


//deleteListing
module.exports.destroyListing = async (req,res)=>{
    let {id} = req.params;
    let deletedlisting =  await Listing.findByIdAndDelete(id);
    // console.log(deletedlisting);
    res.redirect("/listings");

};