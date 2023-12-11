const mongoose = require('mongoose');


// schema --------------school info for 
const Schoolinfo = new  mongoose.Schema({
    SchoolName : {
        type:String,
        required:true
    },
    UDICI_No : {
       type:Number,
       required:true
    },
    Board : {
       type:String,
       required:true
    },
    email : {
       type:String,
       required:true,
       unique:true
    },
    Contact_no : {
       type:Number,
       required:true,
       unique:true
    },
    School_address : {
       type:String,
       required:true,
       
    },
    city :{
      type:String
      
    },
    State :{
      type:String
    },
   
    Pincode :{
      type:Number,
      required:true,
   },
   Stablishment_year :{
      type:Number,
      required:true,
   },
   Principle_name :{
    type:String
   },
   Principle_email :{
      type:String,
      unique:true,
   },
   Principle_Contact :{
      type:Number,
      unique:true,
   },
})

// create a collection regarding your patient registration

const Schooldetails = new mongoose.model("SchoolDetails",Schoolinfo);

module.exports = Schooldetails;