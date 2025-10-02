import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
