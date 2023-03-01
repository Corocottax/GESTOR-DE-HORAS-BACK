const mongoose = require("mongoose");

const HourDialSchema = new mongoose.Schema(
    {
        title: {type: String, unique: true, required: true},
        tasks: [{type: mongoose.Types.ObjectId, ref: "tasks"}],
        color: {type: String, required: true}
    }
);

const HourDial = mongoose.model("hourdials", HourDialSchema);

module.exports = HourDial;