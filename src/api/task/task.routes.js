const { isRegistered } = require("../../middlewares/auth");
const { postTask } = require("./task.controller");

const tasksRoutes = require("express").Router();


tasksRoutes.post("/:idHourDial", [isRegistered], postTask);


module.exports = tasksRoutes;