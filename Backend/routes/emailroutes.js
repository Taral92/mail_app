const express= require('express')
const  {createemail,deleteemail,getallemail}  = require('../controllers/email.controller')
const isauthenticate = require('../middleware/isauthenticate')

const router = express.Router()

router.route('/create').post(isauthenticate,createemail)
router.route('/delete/:id').delete(isauthenticate,deleteemail)
router.route('/getallemail').get(isauthenticate,getallemail)

module.exports=router

