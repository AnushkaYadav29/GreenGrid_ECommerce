const authorize = (...roles) => {
  return (req, res, next) => {
    console.log("Allowed Roles:", roles);
    console.log("Logged User Role:", req.user.role);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication Required",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    next();
  };
};

module.exports = authorize;