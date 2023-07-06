import { verifyToken } from "../controllers/user.js";

const protectApi = async (req, res, next) => {
  try {
    let authorization = req.header("Authorization");
    if (authorization) {
      // verify
      const token = authorization.split(" ")[1];
      await verifyToken(token);
      return next();
    }
  } catch (error) {
    res.status(403).json({ message: "Unauthorized access" });
  }
};

export default protectApi;
