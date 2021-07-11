const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const sensorsSchema = new Schema({

    sensor_user : {type:Schema.Types.ObjectId , ref: 'User'},
    sensor_name: {type:String , required: true},  
    sensor_threshold:{type:String , required:true},
    sensor_readings: [{
        values:{type:String},
        date_time:{type:String},
    }]

},  {
    timestamps: true,
});

const Sensor = mongoose.model('Sensor', sensorsSchema);

module.exports = Sensor;