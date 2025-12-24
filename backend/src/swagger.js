import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Skilllink Nexus API",
      version: "1.0.0",
      description: "Official API documentation",
    },
    servers: [{ url: "http://localhost:5000/api" }],
  },
  apis: ["./src/apps/**/*.routes.js"],
});
