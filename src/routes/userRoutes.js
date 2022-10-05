const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const multer = require('multer')();
const authMiddleware = require('../middlewares/auth');

router.post('/register', multer.single('image'), userController.create);

router.use(authMiddleware);

router.post('/update/:id', userController.update);
router.post('/update_password/:id', userController.updatePassword);
router.get('/get_user/:id', userController.getOne);

module.exports = router;
