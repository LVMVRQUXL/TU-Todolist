const router = require('express').Router();
const cors = require('cors');
const SwaggerUI = require('swagger-ui-express');
const SwaggerSpec = require('../utils').SwaggerSpec;

router.use(cors());

router.use('/tasks', require('./tasks.router'));

router.use('/swagger', SwaggerUI.serve, SwaggerUI.setup(SwaggerSpec));

module.exports = router;
