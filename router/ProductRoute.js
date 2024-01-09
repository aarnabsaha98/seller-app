const express = require('express');
const productRoute = express.Router(); 


const 
{
    addProduct
    , deleteProducts
    , displayProductBasedCatagory
    , displayRamdonProducts
    , updateProducts
} = require('../controllers/ProductController');

const verifySOProducts = require('../middleware/validateProductAgainstShop');


productRoute.get('/:id', displayProductBasedCatagory);
productRoute.get('/', displayRamdonProducts);

productRoute.use(verifySOProducts);
productRoute.post('/', addProduct);
productRoute.patch('/:id', updateProducts);
productRoute.delete('/:id', deleteProducts);

module.exports = productRoute;