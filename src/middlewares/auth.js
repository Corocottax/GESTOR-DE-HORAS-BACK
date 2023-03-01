const User = require("../api/user/user.model");
const { verifyJwt } = require("../utils/jwt");

const isRegistered = async (req, res, next) => {
  try {
    
    const token = req.headers.authorization;
    if (!token) {
      return res.json("Unauthorized");
    }
    const parsedToken = token.replace("Bearer ", "");
    const validToken = verifyJwt(parsedToken, process.env.JWT_SECRET);
    const userLogued = await User.findById(validToken.id);

    userLogued.password = null;
    req.user = userLogued;
    next();

  } catch (error) {
    return res.json(error);
  }
};

module.exports = { isRegistered };