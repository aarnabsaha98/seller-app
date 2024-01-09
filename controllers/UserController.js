const asyncHandler = require('express-async-handler')
const shopOwner = require('../models/owner');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const displayOneUser = asyncHandler(async (req, res) => {
    //res.status(200).json({ message: `Users are displayed ${req.params.id}` });
    const ownerId = req.params.id;
    console.log("owner Id :", ownerId);
    if (!ownerId) {
        res.status(404);
        throw new Error('dukan not found');
    } else {
        const foundOwner = await shopOwner.findById(ownerId);
        console.log(foundOwner);
        res.status(200).json({ foundOwner });
    }
})
const displayUser = asyncHandler(async (req, res) => {
    //res.status(200).json({ message: 'Users are displayed' });
    const owners = await shopOwner.find({});
    console.log(owners);
    res.status(200).json({ owners });
})

const RegisterUser = asyncHandler(async (req, res) => {
    const { Name, Email, Password } = req.body;
    if (!req.body) {
      res.status(400).json({ error: 'Fill up the required fields' });
      return;
    } else {
      const hashedPassword = await bcrypt.hash(Password, 10);
      console.log('hashedPassword:', hashedPassword);
      const owner = new shopOwner({
        Name: Name,
        Email: Email,
        Password: hashedPassword,
      });
      const newOwner = await owner.save();
      console.log(`${owner.Name}, you have successfully registered!`);
      if (newOwner) {
        res.status(200).json({ Email: owner.Email, Name: owner.Name });
      } else {
        res.status(400).json({ error: 'User data is not valid' });
      }
    }
  });
  

const updateUser = asyncHandler(async (req, res) => {
    //res.status(200).json({ message: `Users are updated ${req.params.id}` });
    const id = req.params.id;
    const getShopOwner = await shopOwner.findById(id);
    if (!getShopOwner) {
        res.status(404);
        throw new Error('owner not found!!!!');
    } else {
        const updatedOwner = await shopOwner.findByIdAndUpdate({ _id: id }, req.body);
        res.status(200).json({ updatedOwner });
    }


})
const deleteUser = asyncHandler(async (req, res) => {
    //res.status(200).json({ message: `Users are deleted ${req.params.id}` });
    const id = req.params.id;
    const delShopOwner = await shopOwner.findById(id);
    console.log('shop owner :' , delShopOwner);
    if (!delShopOwner) {
        res.status(404);
        throw new Error('owner not found!!!!');
    } else {
        await shopOwner.deleteOne({ _id: id });
        res.status(200).json({ message: "Owner got deleted!!!" });
    }
})

const LoginUser = asyncHandler(async (req, res) => {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      res.status(400).json({ error: 'All fields must be filled' });
      return;
    }
  
    const user = await shopOwner.findOne({ Email });
    console.log('user :', user);
    
    if (user && (await bcrypt.compare(Password, user.Password))) {
      const accessToken = jwt.sign(
        {
          user: {
            Name: user.Name,
            Email: user.Email,
            id: user._id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '10m' }
      );
      res.status(200).json({ accessToken });
    } else {
      res.status(400).json({ error: 'Session Expired' });
    }
  });
  

const currentUser = asyncHandler(async  (req, res)=>{
    console.log(req.user);
    res.json(req.user)
});

module.exports = {
    displayOneUser
    , displayUser
    , RegisterUser
    , LoginUser
    , updateUser
    , deleteUser
    , currentUser
}



