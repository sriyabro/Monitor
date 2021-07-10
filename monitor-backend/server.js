const express =  require('express');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 6500;

app.use(cors({origin: true, credentials: true}));
app.use(express.json({limit: '50mb', extended: true}));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser: true , useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open' , () => {
    console.log("MongoDB database connection established succesfully");
})

const userRouter = require('./routes/user');
const sensorRouter = require('./routes/sensor');


app.use('/users' , userRouter);
app.use('/sensors' , sensorRouter);


app.listen(port, () => {
    console.log(`server is running on port : ${port}`);
});

