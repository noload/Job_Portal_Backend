import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal Application",
      version: "1.0.0",
      description: "Job Portal application",
    },
    servers: [
      {
        url: "http://localhost:8080", // Change the URL as needed
        description: "Local development server",
      },
      // Add additional server details as needed
    ],
  },
  apis: ["./routes/*.js"], // Path to your API route files
};

export const swaggerSpec = swaggerJsdoc(options);
