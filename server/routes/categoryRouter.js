const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/all', categoryController.getCategories);

module.exports = router;
