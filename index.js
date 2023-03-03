const express = require("express");
require("dotenv").config();
const cors = require("cors");

const indexRoutes = require("./src/api/index/index.routes");
const hourDialRoutes = require("./src/api/hourDial/hourDial.routes");
const tasksRoutes = require("./src/api/task/task.routes");
const userRoutes = require("./src/api/user/user.routes");
const { connectDB } = require("./src/utils/db");
const cloudinary = require('cloudinary').v2

const server = express();
connectDB();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

server.use(cors());

server.use(express.json())

server.use(express.urlencoded({ extended: true }))

server.use("/tasks", tasksRoutes);
server.use("/hourDials", hourDialRoutes);
server.use("/users", userRoutes)
server.use("/", indexRoutes);

server.listen(process.env.PORT, () => {

    console.log("Servidor working in http://localhost:" + process.env.PORT);

})