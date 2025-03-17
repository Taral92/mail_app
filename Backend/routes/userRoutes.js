const express = require('express')
const {register,login, logoout} = require('../controllers/user.controller');
const { uploadfile, upload } = require('../controllers/uploadcontoller');
const router= express.Router();
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logoout').post(logoout)
router.route('/upload').post(upload.single("file"),uploadfile)



module.exports=router


