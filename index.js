import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import bodyParser from "body-parser";
import rfs from "rotating-file-stream";
import morgan from "morgan";
import compression from "compression";
import home from "./routes/home/index.js";
import admin from "./routes/admin/index.js";
import api from "./routes/api/index.js";
import connectToDb from "./db/index.js";
import session from "./session/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const logFile = join(__dirname, "blogChef.log");

const logStream = rfs.createStream("blogChef.log", {
  size: "10M", // rotate every 10 MegaBytes written
  interval: "1d", // rotate daily
  compress: "gzip", // compress rotated files
});

// app.use(morgan(":method - :url - :date - :response-time ms"));
app.use(compression());
app.use(
  morgan(":method  - :url - :date - :response-time ms", {
    stream: logStream,
  })
);
app.use("/assets", express.static(join(__dirname, "public")));
app.use(express.static(join(__dirname, "public", "client")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/admin", session(app));
app.set("view engine", "pug");

app.use("/admin", admin);
app.use("/api", api);
app.use("/", home);

Promise.all([connectToDb()])
  .then(() =>
    app.listen(8080, () => console.log("Server running on port:8080"))
  )
  .catch((error) => {
    console.error(`MongoDB Atlas Error : ${error}`);
    process.exit();
  });
