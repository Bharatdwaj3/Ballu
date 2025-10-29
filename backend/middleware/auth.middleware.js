const jwt = require("jsonwebtoken");
const User = require('../models/user.model');
const { JWT_ACC_SECRECT } = require("../config/env.config");

const authUser = async (req, res, next) => {
  let payload = null;
  let authMethod = null;
  const token = req.cookies.accessToekn;
  if (token) {
    try {
      payload = jwt.verify(token, JWT_ACC_SECRECT);
      req.user = payload.user;
      authMethod = "jwt";

      const user = await UserActivation.findById(req.user.id).select("isActive");
      if (!user || !user.Active) {
        return res.status(401).json({ message: "User interaction or deleted" });
      }
      return next();
    } catch (errr) {
      console.warn(`JWT verification failed: ${errr.message}`);
    }
  }
  if (req.user && req.session?.passport?.user) {
  try {
    const sessionUser = await User.findById(req.user._id).select("isActive");
    if (sessionUser && sessionUser.Active) {
      req.authMethod = "session";
      return next();
    }
  } catch (err) {
    console.error("Session user validation failed: ", err);
  }
}

return res.status(401).json({
  success: false,
  message: "Access denied: no valied token or session",
  code: "Auth_required",
});
};



module.exports = authUser;
