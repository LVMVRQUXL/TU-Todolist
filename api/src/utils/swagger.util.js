const swaggerJSDoc = require('swagger-jsdoc');

const definition = {
    info: {
        title: 'TU Todolist API'
    }
};

const options = {
    definition: definition,
    apis: ['./src/routers/*.js']
};

module.exports = swaggerJSDoc(options);
