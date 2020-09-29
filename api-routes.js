// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!'
    });
});

//Import food diary
var foodDiary = require('./foodDiary');

//Food routes
router.route('/food')
        .get(foodDiary.index)
        .post(foodDiary.new);

router.route('/food/:food_id')
        .get(foodDiary.view)
        .patch(foodDiary.update)
        .put(foodDiary.update)
        .delete(foodDiary.delete);

// Export API routes
module.exports = router;