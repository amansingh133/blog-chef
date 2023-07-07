import { verifyUser } from "../controllers/user.js";
import csurf from "csurf";

const protectRoute =
  (redirectTo = "/") =>
  async (req, res, next) => {
    try {
      if (req.session.user && (await verifyUser(req.session.user.email))) {
        return next();
      }

      res.redirect(redirectTo);
    } catch (error) {
      res.redirect(redirectTo);
    }
  };

export const csurfProtection = csurf();
export default protectRoute;
