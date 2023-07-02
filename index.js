import express from "express";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import bodyParser from "body-parser";
import { createWriteStream } from "fs";
import morgan from "morgan";
import session from "express-session";
import compression from "compression";
import protectRoute from "./utils/protectRoute.js";

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
    secret:
      app.get("env") === "production"
        ? process.env.sessionSecret
        : "abcdef123456",
    cookie: {
      httpOnly: true,
      maxAge: 18000000,
      secure: app.get("env") === "production" ? true : false,
    },
  })
);
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.send("<h1>BlogChef says Hello!</h1>");
});

app
  .get("/admin", (req, res) =>
    req.session.user
      ? res.redirect("/admin/dashboard")
      : res.redirect("/admin/login")
  )
  .get("/admin/login", (req, res) => res.render("login"))
  .post("/admin/login", (req, res) => {
    const { email, password } = req.body;
    if (email === "a@b.com" && password === "a") {
      req.session.user = "Test User"; //Storing data in the session
      return res.redirect("/admin/dashboard");
    }

    res.redirect("/admin/login");
  });

app.get("/admin/dashboard", protectRoute("/admin/login"), (req, res) =>
  res.render("dashboard", {
    user: req.session.user || "Stranger",
    posts: [
      {
        id: 1,
        author: "User 1",
        title: "I love Express",
        content:
          "Express is a wonderful framework for building Node.js applications",
      },
      {
        id: 2,
        author: "User 2",
        title: "Have you tried Pug",
        content:
          "I recently tried the Pug templating language and its excellent!",
      },
    ],
  })
);

app.get("/admin/logout", (req, res) => {
  delete req.session.user;
  res.redirect("/admin/login");
});

app.post("/admin/approve", (req, res) => res.redirect("/admin/dashboard"));

app.post("/api/posts", (req, res) => {
  console.log(req.body);
  res.json({ message: "Got it!" });
});

app.listen(8080, () => console.log("Server running on port:8080"));
