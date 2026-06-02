const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'API de challenge xacademy',
            version: '1.0.0',
            description: 'Documentación de la API para el proyecto fifa'
        },
        servers: [
            {
                url: 'http://localhost:8080'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./src/routes/*.js']
};

const swaggerDocs = swaggerJsdoc(options);

module.exports = swaggerDocs;