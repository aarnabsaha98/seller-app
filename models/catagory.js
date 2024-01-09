const mongoose = require('mongoose');

const catagorySchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
      },
      Types: {
        type: String, // Updated syntax for array of strings
        required: true
      },
      // Shop_id: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   // required: true,
      //   ref: "shop"
      // }, 
      ChildCatagory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "catagory"
      },

        
      
    });


    const Category = mongoose.model('category', catagorySchema);

    module.exports = Category;
