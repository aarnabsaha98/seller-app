const mongoose = require('mongoose');
const dukanSchema = new mongoose.Schema({

    Name: {
        type: String,
        required: true,
    },
    Address:{
        type:String,
        required: true,
        trim: true
    },
    PinCode:{
        type:String,
        required: true,
        unique: true
    },
    PhoneNumber: {
        type: String,
        // required: true,
        unique: true
    },
    owner_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "user"
    } // //ref: shopOwner 
    
})

const Shops = mongoose.model('Shops', dukanSchema);
module.exports = Shops;
