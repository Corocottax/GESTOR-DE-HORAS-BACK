const { isRegistered } = require("../../middlewares/auth");
const { createHourDial, hourDialUpdate } = require("./hourDial.controller");

const hourDialRoutes = require("express").Router();

hourDialRoutes.post("/:idUser", [isRegistered], createHourDial);
hourDialRoutes.put("/:id", [isRegistered], hourDialUpdate);

module.exports = hourDialRoutes;
