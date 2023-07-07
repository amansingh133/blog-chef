import { Router } from "express";
import protectRoute, { csurfProtection } from "../../utils/protectRoute.js";
import home from "./home.js";
import login from "./login.js";
import dashboard from "./dashboard.js";
import logOut from "./logout.js";
import moderatePost from "./moderate-post.js";
import {
  loginAdminValidation,
  signUpAdminValidation,
} from "../../utils/validation.js";

const router = Router();

router.get("/", home);
router
  .route("/login")
  .get(csurfProtection, (req, res) =>
    res.render("login", { csrfToken: req.csrfToken() })
  )
  .post(csurfProtection, loginAdminValidation, login);

router
  .route("/signup")
  .get(csurfProtection, (req, res) =>
    res.render("signup", { csrfToken: req.csrfToken() })
  )
  .post(csurfProtection, signUpAdminValidation, signUpAdmin);

router.get(
  "/dashboard",
  protectRoute("/admin/login"),
  csurfProtection,
  dashboard
);
router.get("/logout", logOut);
router.post("/moderate", csurfProtection, moderatePost);

export default router;
