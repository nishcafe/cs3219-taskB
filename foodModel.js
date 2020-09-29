
var mongoose = require('mongoose');

//Setup schema
var foodSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    calories: Number,
    price: Number
});

//Export food model
var Food = module.exports = mongoose.model('food', foodSchema);

module.exports.get = function (callback, limit)
{
    Food.find(callback).limit(limit);
}