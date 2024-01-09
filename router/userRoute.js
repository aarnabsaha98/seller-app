const express = require('express');
const userRoute = express.Router();

const {
    displayOneUser
    , displayUser
    , RegisterUser
    , updateUser
    , deleteUser
    , LoginUser
    , currentUser } = require('../controllers/UserController')

const validateCurrentUser  = require("../middleware/validateCurrentUser");

userRoute.route('/').get(displayUser)
userRoute.route('/register').post(RegisterUser)
userRoute.route('/login').post(LoginUser);
userRoute.get("/current", validateCurrentUser, currentUser);
userRoute.route('/:id').get(displayOneUser).patch(updateUser).delete(deleteUser);

module.exports = userRoute;