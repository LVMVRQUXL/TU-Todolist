const router = require('express').Router();

router.use('/tasks', require('./tasks.router'));

module.exports = router;