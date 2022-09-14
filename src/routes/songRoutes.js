const express = require('express');
const songController = require('../controllers/songController');
const router = express.Router();
const multer = require('multer')();

router.post('/create', multer.single('image'), songController.create);
router.get('/get/:id', songController.getOne);
router.get('/search', songController.search);

module.exports = router;