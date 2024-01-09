const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Price: {
        type: String,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
    Catagory_id: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: "catagory"
    },
    Shop_id: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: "shop"
    }

});


const Products = mongoose.model('product', productSchema);

module.exports = Products;