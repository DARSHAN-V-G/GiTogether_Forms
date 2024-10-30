const express = require('express')
const router = express.Router()

const{
    postData
} = require('../controllers/registrationController')

router.post('/register',postData);
module.exports = router;