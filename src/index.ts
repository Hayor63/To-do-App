import dotenv from "dotenv";
dotenv.config();
import express, { Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import * as swaggerUi from "swagger-ui-express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/connection";
import router from "./route/v1";
import deserialize from "./middleware/deserializeUser";

const app = express();

const port = 8001;
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Todo App API Documentation",
    version: "1.0.0",
    description:
      "Comprehensive API documentation for the Todo application built with TypeScript",
  },
  servers: [
    {
      url: "http://localhost:8001",
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT", // Optional, indicates the token type
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
};
const options = {
  swaggerDefinition,
  apis: [
    "./src/routes/*.ts", // Matches: /routes/users.ts
    "./src/routes/**/*.ts",
    "./src/route/v1/**/*.ts",
  ],
};
const swaggerSpec = swaggerJSDoc(options);

var corOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  setHeaders: function (res: Response, path: string, stat: any) {
    res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  },
};

app.use(express.json());
app.use(cors(corOptions));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.disable("x-powered-by");

// Add default route for root URL
app.get("/", (req, res) => {
  res.json({ message: "API is running successfully!" });
});

// Swagger UI setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(deserialize);
app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
  connect();
});

export default app;
