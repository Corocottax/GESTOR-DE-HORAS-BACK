const mongoose = require("mongoose");

const DB_URL = process.env.MONGO_DB;

const connectDB = async () => {

    try {
        mongoose.set("strictQuery", true);
        mongoose.connect(DB_URL);
        console.log("conectado con éxito a la bbdd");
    } catch (error) {
        console.log("error al conectar con la bbdd", error);
    }


};

module.exports = { connectDB }