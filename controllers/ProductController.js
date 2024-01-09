const { response } = require('express');
const products = require('../models/Products');
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

// create a new product

/* One thing we can do is like we can take all the products and get the products
from that list that way we will not hammer the db every time.*/

const addProduct = async (req, res, next) => {

    const { Name, Price, Quantity, catagoryId, shopId } = req.body;

    if (!req.body) {
        res.status(400).json({ message: "req body is empty" });
        return;
    } else {
    
        const prod = new products({
            Name: Name,
            Price: Price,
            Quantity: Quantity,
            Catagory_id: catagoryId,
            Shop_id :shopId
        });
        const newProd = await prod.save();
        console.log("Products name :", req.body);
        res.status(200).json({ newProd });
    }
}


const deleteProducts = async (req, res, next) => {

    const prodIdToDelete = req.params;
    console.log("prodIdToDelete :", req.params);
    if (!prodIdToDelete) {
        res.status(404);
        throw new Error(" No Product Seleted to delete || product not found");
    } else {
        let foundProductsId = await products.findById(prodIdToDelete);
        if (foundProductsId) {
            try {
                await products.deleteOne({ _id: foundProductsId });
                res.status(200).json({ message: "product is deleted" });
            } catch (e) {
                res.status(500);
                throw new Error('Server Error');
            }

        }
    }
};

const updateProducts = async (req, res, next) => { 
    const {_id:productId} = req.params;
    console.log('Update Product', productId);
    if(productId){
        let updatedProduct =  await products.findByIdAndUpdate(
            {_id : productId}
            , req.body);
        
        console.log('Updated Product : ', updatedProduct);
    } else {
        res.status(404).json({message: 'Product not found'});
    }
};


// 1 display the products based on catagory :: catagory level search
const displayProductBasedCatagory = async (req, res, next) => {
    let { id: selectedCategory } = req.params;
    console.log("selectedCategory", selectedCategory);
    if (selectedCategory) {
        try {
            // Convert the selectedCategory to a valid ObjectId
            const _categoryId = new ObjectId(selectedCategory);
            console.log("selectedCategoryId", _categoryId);
            // Using the categoryId in the search query 

            let foundProducts = await products.find({ Catagory_id: _categoryId });
            console.log(foundProducts);
            res.status(200).json({ products: foundProducts });
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    } else {
        res.status(404);
        throw new Error('Please select a category');
    }
};

// display Random Products ::: specially the top selling products  
const displayRamdonProducts = async (req, res, next) => {

    let listProducts = await products.find();
    console.log("listProducts : ", listProducts);
    res.status(200).json(listProducts);

}




module.exports = {
    addProduct
    , deleteProducts
    , displayProductBasedCatagory
    , displayRamdonProducts
    , updateProducts
}