const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Prescription = new Schema({
    drug_name:String,
    dose: String,
    history:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'History'
        }
    ]
})

module.exports = mongoose.model('Prescription', Prescription);