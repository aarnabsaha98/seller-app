const express = require('express');
const catagoryRoute = express.Router();

const {   displayCatagory,
    AddCatagory,
    UpdateCatagory  } = require('../controllers/catagoryController')

catagoryRoute.get('/displayCatagory',displayCatagory);
catagoryRoute.post('/',AddCatagory);
catagoryRoute.patch('/:id',UpdateCatagory);


module.exports = catagoryRoute;