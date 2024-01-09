const express = require('express');
const shopRoute = express.Router();

const {
       displayDukan
       , displayAllDukan
       , displayOneDukan
       , AddDukan
       , updateDukan
       , deleteDukan
} = require('../controllers/ShopsController')

const validateCurrentUser = require('../middleware/validateCurrentUser');


shopRoute.route('/:id').get(displayOneDukan);
shopRoute.route('/').get(displayAllDukan);

shopRoute.use(validateCurrentUser);
shopRoute.route('/').get(displayDukan).post(AddDukan);
shopRoute.route('/:id').patch(updateDukan).delete(deleteDukan);

module.exports = shopRoute;