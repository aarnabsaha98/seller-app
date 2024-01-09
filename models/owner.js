const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password :{
        type :String,
        required :true
    }
});


const shopOwner = mongoose.model('shopOwner', ownerSchema);

module.exports = shopOwner;