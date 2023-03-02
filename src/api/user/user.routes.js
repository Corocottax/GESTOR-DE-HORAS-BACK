const { isRegistered } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const { signUp, loginUser, getUser, updateUser } = require("./user.controller");

const userRoutes = require("express").Router();

userRoutes.post("/", upload.single("photo"), signUp);
userRoutes.post("/login", loginUser);
userRoutes.get("/:id", [isRegistered], getUser);
userRoutes.put("/:id", [isRegistered], upload.single("photo"), updateUser);

module.exports = userRoutes;