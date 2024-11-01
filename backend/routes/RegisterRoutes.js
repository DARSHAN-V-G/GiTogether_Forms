const express = require('express')
const router = express.Router()
const { getEventData } = require('../controllers/eventController');
const { authorize } = require('../middlewares/authorize');
const{
    postData
} = require('../controllers/registrationController')

router.post('/register',postData);     // Public login route
router.post('/view', authorize, getEventData); // Protected route for event data

module.exports = router;