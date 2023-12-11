// -----------------------------------updation of Indivisuals info ---------------------

const dauth = require('../middleware/dauth');

//-----------------------------models to aquire for schema---------------------
const School_R = require("../models/School");
const Student_R = require("../models/Indivisual");


// updation for indivisuals
app.post('/updateI',dauth, (req,res)=>{
    Student_R.findOneAndUpdate({email:req.currStudent.email},
      {$set:{
        name : req.body.dname,
        age : req.body.age,
        sex : req.body.sex,
        email : req.body.email,
        phone :req.body.phone
  
      }},
      function(err,doc){
        if(err){
          console.log("Something wrong when updating data!");
        }
        else{
          res.render('....'); }
      });
  });
  // detion for indivisuals
  app.delete('/deleteI', dauth, (req, res) => {
      const user = req.currStudent;
    
      Student_R.findOneAndDelete({ email: user.email }, (err, doc) => {
        if (err) {
          console.log("Something wrong when deleting data!");
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          if (doc) {
            res.status(200).json({ message: "Individual information deleted successfully!" });
          } else {
            res.status(404).json({ error: "Individual not found" });
          }
        }
      });
    });
  
    // read or info of indivisuals
    app.get('/readI', dauth, (req, res) => {
      const user = req.currStudent;
    
      Student_R.findOne({ email: user.email }, (err, student) => {
        if (err) {
          console.log("Something wrong when reading data!");
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          if (student) {
            res.status(200).json({ student });
          } else {
            res.status(404).json({ error: "Individual not found" });
          }
        }
      });
    });
  //search by email for indivisuals
    app.get('/searchI/:email', dauth, (req, res) => {
      const user = req.currStudent;
      const searchEmail = req.params.email;
    
      Student_R.findOne({ email: searchEmail }, (err, student) => {
        if (err) {
          console.log("Something wrong when searching data!");
          res.status(500).render('error', { error: "Internal Server Error" });
        } else {
          if (student) {
            res.status(200).render('individualInfo', { student });
          } else {
            res.status(404).render('error', { error: "Individual not found" });
          }
        }
      });
    });
    
  
  
    