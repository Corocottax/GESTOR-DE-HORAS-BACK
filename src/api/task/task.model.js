const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
    {
        title: {type: String, unique: true, required: true},
        color: {type: String, required: true},
        time: {type: String, required: true}
    }
);

const Task = mongoose.model("tasks", TaskSchema);

module.exports = Task;