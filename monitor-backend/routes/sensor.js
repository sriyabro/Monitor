const router = require('express').Router();
let Sensor = require('../models/sensor.model');
let User = require('../models/users.model');
let alertUser = require('../controllers/alert');


router.route('/add').post(async (req,res) => {

    try {

        //Create New User
        const sensor_user = await User.findById(req.body.sensor_user);
        const sensor_name = req.body.sensor_name;
        const sensor_threshold = req.body.sensor_threshold;

        const newSensor = new Sensor({

            sensor_user, 
            sensor_name,
            sensor_threshold,
        });
    
        await newSensor.save();
        res.status(200).json('Sensor Added!')

    } catch (error) {
        res.status(400).json('Error: '+ error)
    }

});

//add values to sensor
router.route('/data').post(async(req,res) => {

    //let userOb = await User.findById(req.params.id)
    let sensor = await Sensor.findOne({_id: req.body.sensor_id}).populate('sensor_user');

    sensor.sensor_readings.push({
        values : req.body.values,
        date_time : req.body.date_time
    })

    if(parseFloat(sensor.sensor_threshold)<= parseFloat(req.body.values)){
        alertUser(sensor, req.body.values);
    }

    await sensor.save()

    .then(() => res.json('New Value Added'))
    .catch(err => res.status(400).json('Error: ' + err));

});

//get all sensor
router.route('/').get((req,res) => {
    Sensor.find()
    .then(sensor => res.json(sensor))
    .catch(err => res.status(400).json('Error: '+ err));
});

//get sensor by id
router.route('/:id').get(async(req,res) => {
    try {
        let sensors = await Sensor.findById(req.params.id);
        res.json(sensors)

    } catch (error) {
        res.status(400).json('Error: '+ error)
    }

});

//get all sensor related to a specific user
router.route('/user/:id').get(async(req,res) => {
    try {
        let userOb = await User.findById(req.params.id);
        let sensors = await Sensor.find({ sensor_user: userOb});
        res.json(sensors)

    } catch (error) {
        res.status(400).json('Error: '+ error)
    }

});

//delete sensor
router.route('/:id').delete( async(req, res) => {
   try {
       let sensor = await Sensor.findOneAndDelete({_id: req.params.id});
       res.json(sensor);
   }
   catch (error) {
       res.status(400).json('Error: '+ error)
   }
});


module.exports = router;