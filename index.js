const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config(); 
const port = process.env.PORT | 8080;
const shopRoute = require('./router/shopRoute');
const userRoute = require('./router/userRoute');
const productRoute = require('./router/ProductRoute');
const catagoryRoute = require('./router/catagoryRoute');

const connectToMongo = require('./coonectDB/server');
const errorHandler = require('./middleware/middleware');
const mongoURI =  process.env.MONGO_URI;
// const path = reqire('')

app.use(express.json());
// app.use(bodyParser.json());

app.use('/api/chotadukan' , shopRoute);
app.use('/api/user' ,userRoute);
app.use('/api/products', productRoute);
app.use('/api/catagory', catagoryRoute);
// middlewares
app.use(errorHandler);

app.listen(port , err => {
    if(err){
        console.log(`Error running at server ${port}`)
    } else{
        connectToMongo(mongoURI);
        console.log(`http://localhost:${port}`)
    }
})