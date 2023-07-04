import express from "express";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import bodyParser from "body-parser";
import { createWriteStream } from "fs";
import morgan from "morgan";
import session from "express-session";
import compression from "compression";
import home from "./routes/home/index.js";
import admin from "./routes/admin/index.js";
import api from "./routes/api/index.js";
import connectToDb from "./db/index.js";
import { error } from "console";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const logFile = join(__dirname, "blogChef.log");

// app.use(morgan(":method - :url - :date - :response-time ms"));
app.use(compression());
app.use(
  morgan(":method - :url - :date - :response-time ms", {
    stream: createWriteStream(logFile, { flags: "a" }),
  })
);
app.use("/assets", express.static(join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  "/admin",
  session({
    name: "sessId",
    resave: false,
    saveUninitialized: true,
    secret: process.env.sessionSecret,
    cookie: {
      httpOnly: true,
      maxAge: 18000000,
      secure: app.get("env") === "production" ? true : false,
    },
  })
);
app.set("view engine", "pug");

app.use("/", home);
app.use("/admin", admin);
app.use("/api", api);

Promise.all([connectToDb])
  .then(() =>
    app.listen(8080, () => console.log("Server running on port:8080"))
  )
  .catch((error) => {
    console.error(`MongoDB Atlas Error : ${error}`);
    process.exit();
  });
