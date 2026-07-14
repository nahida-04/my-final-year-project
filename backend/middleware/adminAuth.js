import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 1. Check header exists
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

    // 5. ADMIN CHECK (UPDATED - BEST PRACTICE)
    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied: Not admin"
      });
    }

    // 6. Attach admin info
    req.admin = decoded;

    next();

  } catch (error) {
    console.error("adminAuth error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Token expired or invalid"
    });
  }
};

export default adminAuth;