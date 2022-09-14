const express = require('express');
const router = express.Router();

router.use('/user', require('./userRoutes'));
router.use('/auth', require('./authRoutes'));
router.use('/images', require('./imageRoutes'));
router.use('/song', require('./songRoutes'));

module.exports = router;