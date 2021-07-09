const router = require('express').Router();
let Sensor = require('../models/sensor.model');
let User = require('../models/users.model');
let alertUser = require('../controllers/alert');


router.route('/add').post(async (req,res) => {

    try {

        //Check Current Sensor
        let sensor = await Sensor.findOne({ sensor_name: req.body.sensor_name});
        if(sensor) return res.status(400).send('Sensor Existing')

        let userOb = await User.findById(req.body.sensor_user);
    
        //Create New User
        const sensor_user = userOb;
        const sensor_name = req.body.sensor_name;
        const sensor_threshold = req.body.sensor_threshold;
        const sensor_readings = req.body.sensor_readings; 

        const newSensor = new Sensor({

            sensor_user, 
            sensor_name,
            sensor_threshold,
            sensor_readings, 
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

    let value = req.body.values;

    sensor.sensor_readings.push({
        values : value,
        date_time : Date(req.body.date_time)
    })

    if(sensor.sensor_threshold <= value){
        alertUser(sensor, value);
    }

    await sensor.save()

    .then(() => res.json('New Value Added'))
    .catch(err => res.status(400).json('Error: ' + err));

});



module.exports = router;