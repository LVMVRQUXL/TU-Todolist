const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const SwaggerSpec = require('../utils').SwaggerSpec;

module.exports = (app) => {
    app.use(cors());

    // TODO

    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(SwaggerSpec));
};
