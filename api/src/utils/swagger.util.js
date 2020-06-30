const swaggerJSDoc = require('swagger-jsdoc');

const definition = {
    info: {
        title: 'TU Todolist API'
    }
};

const options = {
    definition: definition,
    apis: ['./src/routes/*.route.js']
};

module.exports = swaggerJSDoc(options);
