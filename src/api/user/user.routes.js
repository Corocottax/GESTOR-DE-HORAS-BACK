const { isRegistered } = require("../../middlewares/auth");
const { signUp, loginUser, getUser, updateUser } = require("./user.controller");

const userRoutes = require("express").Router();

userRoutes.post("/", signUp);
userRoutes.post("/login", loginUser);
userRoutes.get("/:id", [isRegistered], getUser);
userRoutes.put("/:id", [isRegistered], updateUser);

module.exports = userRoutes;