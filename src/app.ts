import express from "express";

// Importing routes
import userRoute from "./routes/user.js";
import { connectDB } from "./utils/features.js";

const port = 4000;

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API Working with /api/v1/");
});

// Using routes
app.use("/api/v1/user", userRoute);

app.listen(port, () => {
  console.log(`Express is working on localhost : ${port}`);
});
