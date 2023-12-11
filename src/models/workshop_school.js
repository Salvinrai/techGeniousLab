const mongoose = require('mongoose');

// schema for workshop id createion

const workshop = new mongoose.Schema({

    workshop_id :{
        type:Number,
        
    },
    UIDCI_No:{
        type:Number,
        required:true
    },
    Title:{
        type:String,
    },
    Description:{
        type:String,
    },
    Total_participants:{
        type:Number,
    },
    fee:{
        type:Number,
    },
    status:{
        type:String,
    },
    banner:{
        type:String,
    }
})

const workshop_registration = new mongoose.model("workshop_register",workshop);

module.exports = workshop_registration;
