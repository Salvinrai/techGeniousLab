//requiremnets -------------------require



const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const async = require('hbs/lib/async');
const jwt =require('jsonwebtoken');
const res = require('express/lib/response');

// schema --------------registration for 
const SchoolSchema = new  mongoose.Schema({
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
 password : {
    type:String,
    required:true
 },
 Status :{
   type : String,
   // registration to be marked as pending

 },

tokens: [{
    token :{
       type:String,
       required:true
    }
 }]
})
//---------------token generation for work modulle for authentication-------
SchoolSchema.methods.generateAuthToken = async function(){

   try{
      const token = jwt.sign({_id:this.email}, process.env.SECRET_KEY);
       this.tokens = this.tokens.concat({token:token})
      await this.save();

      return token;
   }
   catch (error){
      res.send('the error part' + error);
      console.log('the error part' + error);

   }
}
//--------------- incription of password---------------
SchoolSchema.pre('save', async function(next){
   if(this.isModified('password')){
      console.log(`this password is ${this.password}`);
      this.password = await bcrypt.hash(this.password, 10);
      console.log(`this password is ${this.password}`);
   }
   
   next();
})


// create a collection regarding your patient registration

const SchoolRegistration = new mongoose.model("SchoolAuth",SchoolSchema);

module.exports = SchoolRegistration;

