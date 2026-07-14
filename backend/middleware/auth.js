import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 1. Check token exists
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token provided"
      });
    }

    // 2. Check Bearer format
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format"
      });
    }

    // 3. Extract token
    const token = authHeader.split(" ")[1];

    // 4. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Attach user (clean + consistent)
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role || "user"
    };

    next();

  } catch (error) {
    console.error("auth error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Token expired or invalid"
    });
  }
};

export default auth;