 //Import contact model
Food = require('./foodModel');

//Handle index actions
exports.index = function(req, res) {
    Food.get(function(err, foodItems) {
        if(err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        return res.json({
            status: "success",
            message: "Food retrieved successfully",
            data: foodItems
        });
    });
};

//Handle create food actions
exports.new = function(req, res) {
    var food = new Food();
    food.name = req.body.name ? req.body.name : food.name;
    food.calories = req.body.calories;
    food.price = req.body.price;

    //save the food item & check for errors
    food.save(function(err) {
        if(err)
           return res.send(err);
        return res.json({
            message:'Food Diary updated',
            data: food
        });
    });
};

//Handle view food info
exports.view = function(req, res) {
    Food.findById(req.params.food_id, 
        function(err, food) {
            if (err)
                return res.send(err);
            return res.json({
                message: 'Food details loading...',
                data: food
            });
    });
};

//Handle update food info
exports.update = function(req, res) {
    Food.findById(req.params.food_id, 
        function(err, food) {
            if(err)
                return res.send(err);

            food.name = req.body.name ? req.body.name : food.name;
            food.calories = req.body.calories;
            food.price = req.body.price;

            //save the contact & check for errors
            food.save(function(err) {
                if (err)
                    return res.json(err);
                return res.json({
                    message:'Food info updated',
                    data: food
                });
            });
    });
};

//Handle delete food
exports.delete = function(req, res) {
    Food.remove({
        _id:req.params.food_id
    }, function(err, food) {
        if(err)
            return res.send(err);
        
        return res.json({
            status: "success",
            message: "Food deleted"
        });
    });
};
