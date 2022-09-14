const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const multer = require('multer')();

router.post('/register', multer.single('image'), userController.create);
router.get('/get_user/:id', userController.getOne);

module.exports = router;
