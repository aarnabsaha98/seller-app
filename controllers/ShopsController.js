const asyncHandler = require('express-async-handler');
const Shops = require("../models/shops");

//@desc Get one shop
//@route GET api/chotadukan/:id
//@access public
const displayOneDukan = asyncHandler(async (req, res) => {
    //res.status(200).json({ message: `Users are displayed ${req.params.id}` });
    const dukanId = req.params.id;
    console.log("dukan Id ", dukanId);
    if (!dukanId) {
        res.status(404);
        throw new Error('dukan not found');
    } else {
        const foundShop = await Shops.findById(dukanId);
        if(foundShop){
            console.log(foundShop);
            res.status(200).json({ foundShop });
        } else{
            res.status(400).json({ message : "Not found" });
            return;
        }
        
    }
})

//@desc Get all shops
//@route GET api/chotadukan/
//@access public
const displayAllDukan = asyncHandler(async (req, res) => {
    const shops = await Shops.find();
    console.log(shops);
    res.status(200).json({ shops });
});

//@desc Get all shops
//@route GET api/chotadukan/
//@access private
const displayDukan = asyncHandler(async (req, res) => {
    const shops = await Shops.find({user_id: req.user.id });
    console.log(shops);
    res.status(200).json({ shops });
});


//@desc Create one shop
//@route CREATE api/chotadukan/
//@access private
const AddDukan = asyncHandler(async (req, res) => {
    // res.status(200).json({ message : "New shop created " });
    const { Name, Address, PinCode, PhoneNumber } = req.body;
    console.log(Name, Address, PinCode, PhoneNumber);
    if (!req.body) {
        res.status(400).json({message : "req body is empty"});
        return;
        //throw new Error("Fill up All the required fields");
    } else {
        console.log('req user :' ,req.user);
        const shop = new Shops({
            Name: Name,
            Address: Address,
            PinCode: PinCode,
            PhoneNumber: PhoneNumber,
            owner_id: req.user.id
        });
        const newShop = await shop.save();
        console.log("shop name :", req.body);
        res.status(200).json({ newShop });
    }
});

//@desc Update one shop
//@route UPDATE  api/chotadukan/:id
//@access private
const updateDukan = asyncHandler(async (req, res) => {
    // res.status(200).json({ message : `Shops are updated ${req.params.id}` });
    // obect destructuring
    // const { id: dukanId } = req.params;
    const dukanId = req.params.id;
    console.log("dukan Id ", dukanId, req.body);
    if (!dukanId) {
        const foundShop = await Shops.findById(dukanId);
        if (!foundShop) {
          
            // if (req.body.owner == foundShop.owner) {

            try {
                console.log("matched");
                const updatedDukan = await Shops.findByIdAndUpdate(
                    { _id: dukanId },
                    req.body
                );
                console.log("updatedDukan :", updatedDukan);
                res.status(200).json({ updatedDukan });
                console.log("updated");
            } catch (err) {
                res.status(500);
                throw new Error('Server Error');
            }
        }
    } else {
        res.status(404);
        throw new Error('Shop Not Found');
    }
});

//@desc Delete one shop
//@route  DELETE  api/chotadukan/:id
//@access private
const deleteDukan = asyncHandler(async (req, res) => {
    // res.status(200).json({ message : `Shops are deleted ${req.params.id}`});
    const { id: dukanId } = req.params;
    console.log("dukan Id ", dukanId);
    if (dukanId) { }
    const foundShop = await Shops.findById(dukanId);
    if (foundShop) {
        console.log("dukan found ", foundShop);
        // if (req.body.owner == foundShop.owner) {
        try {
            await Shops.deleteOne({ _id: dukanId });
            res.status(200).json({ message: "Shop is deleted" });
        } catch (err) {
            res.status(500);
            throw new Error('Server Error');
        }
    } else {
        res.status(404);
        throw new Error('Shop Not Found');
    }
});

module.exports = {
    displayDukan,
    displayAllDukan,
    displayOneDukan,
    AddDukan,
    updateDukan,
    deleteDukan,
};
