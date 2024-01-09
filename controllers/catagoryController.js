const { response } = require('express');
const Catagory = require('../models/catagory');



const displayCatagory = async (req, res) => {

    const catagory = await Catagory.find();
    if (catagory) {
        res.status(200).json({ catagory: catagory });
    } else {
        res.status(404);
        throw new Error('Not Found');
    }
}


// there should be some default catagory which will be provided by us
// the seller created catagories can be add, deleted or updated by seller only !

const AddCatagory = async (req, res) => {

    const { Name, Types, childCatagory } = req.body;

    if (!req.body) {

    } else {
        let catagory = new Catagory({
            Name: Name,
            Types: Types,
            ChildCatagory: childCatagory
        });
        let createdCatagory = await catagory.save();
        console.log("createdCatagory", createdCatagory);
        res.status(200).json({ catagory: createdCatagory });
    }

}

const DeleteCatagory = async (req, res) => {

    console.log(req.params);
    const { id: catagoryId } = req.params;
    if (catagoryId) {
        const catagoryFound = await Catagory.findById(catagoryId);
        console.log("catagoryFound :: ", catagoryFound); 
        if (catagoryFound) {
            await Catagory.deleteOne(
                { 
                    _id: catagoryId 
                })
            console.log("catagory deleted");
            res.status(200).json(updateCatagory);
        } else {
            res.status(404).json({ message: "Not Found" });
        }
    } else {
        res.status(403).json({ message: "Wrong Id, Catagory can not be deleted" });
    }
}


const UpdateCatagory = async (req, res) => {

    console.log(req.params , req.body);
    const { id: catagoryId } = req.params;
    if (catagoryId) {
        const catagoryFound = await Catagory.findById(catagoryId);
        console.log("catagoryFound :: ", catagoryFound); 
        if (catagoryFound) {
            let updateCatagory = await Catagory.findByIdAndUpdate(
                { 
                    _id: catagoryId 
                }, 
                req.body);
            console.log("updateCatagory ::: ", updateCatagory);
            res.status(200).json(updateCatagory);
        } else {
            res.status(404).json({ message: "Not Found" });
        }
    } else {
        res.status(403).json({ message: "Wrong Id, Finding Catagory" });
    }

}

module.exports = {
    displayCatagory,
    AddCatagory,
    DeleteCatagory,
    UpdateCatagory

}