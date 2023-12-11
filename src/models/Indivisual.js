const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const async = require('hbs/lib/async');
const jwt =require('jsonwebtoken');
const res = require('express/lib/response');

// schema--------------------------registration for Student
const Student = new  mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    Fathername : {
      type:String,
      required:true
  },
    email : {
       type:String,
       required:true,
       unique:true
    },
    phone : {
       type:Number,
       required:true,
       unique:true
    },
    F_contact : {
       type:Number,
       required:true,
       unique:true
    },
    
    Address :{
       type:String,
       required:true,
    },
    School_Name :{
      type:String,
      required:true,
   },
   Board :{
      type:String,
      required:true,
   },
   School_address :{
      type:String,
      required:true,
   },
   password : {
      type:String,
      required:true
   },
   workshop_id :{
      type:Array
   },
    tokens: [{
      token :{
         type:String,
         required:true
      }
   }]
  
})

//---------------token generation for work modulle for authentication-------
Student.methods.generateAuthToken = async function(){

   try{
      const token = jwt.sign({_id:this.email}, process.env.SECRET_WAY);
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
Student.pre('save', async function(next){
   if(this.isModified('password')){
      console.log(`this password is ${this.password}`);
      this.password = await bcrypt.hash(this.password, 10);
      console.log(`this password is ${this.password}`);
   }
   
   next();
})


   // create a collection regarding your doctor registration

const StudentRegistration = new mongoose.model("RegisterStudent",Student);

module.exports = StudentRegistration;