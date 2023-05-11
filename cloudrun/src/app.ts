import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

import { handleGet, handlePost } from "./lib/streaming";

const app = express();

// Use CORS for local development
app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).send("hello");
});

app.post("/api/data", handlePost);
app.get("/api/data", handleGet);

export default app;
