import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDb } from "./libs/db.js";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
dotenv.config();
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server listen on port = ${port}...`);
  connectDb();
});
