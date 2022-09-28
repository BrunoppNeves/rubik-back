const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const multer = require('multer')();

router.post('/register', multer.single('image'), userController.create);
router.post('/update/:id', userController.update);
router.post('/update_password/:id', userController.updatePassword);
router.get('/get_user/:id', userController.getOne);

module.exports = router;
