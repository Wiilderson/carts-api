import express from "express";
import swaggerUi from "swagger-ui-express";
import router from "./routes/routes";
import swaggerDocs from "../swagger.json";
import cors from "cors";
const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/documenttion", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api", router);
app.listen(port, () =>
  console.log(`listening on port https://localhost:${port}`)
);
