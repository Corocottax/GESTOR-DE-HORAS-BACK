const { getIndex } = require("./index.controller");

const indexRoutes = require("express").Router();

indexRoutes.get("/", getIndex);

module.exports = indexRoutes;