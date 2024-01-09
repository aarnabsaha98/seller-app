const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;

const connectToMongo = () => {
    (async () => {
        console.log('server connection start');
        await mongoose.connect(mongoURI);
        console.log("Connected to mongo Successful");
    })();
}

module.exports = connectToMongo;