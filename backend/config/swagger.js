const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DevOps Chatting Blog API',
      version: '1.0.0',
      description: 'API documentation for DevOps Chatting Blog',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [], // Empty array to avoid swagger-jsdoc parsing errors
};

let swaggerSpec;
try {
  swaggerSpec = swaggerJsdoc(options);
} catch (error) {
  // eslint-disable-next-line no-console
  console.error('Swagger JSDoc Error:', error.message);
  // Fallback to basic spec if parsing fails
  swaggerSpec = options.definition;
}

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;