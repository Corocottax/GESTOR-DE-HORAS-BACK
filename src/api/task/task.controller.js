const Task = require("./task.model.js");
const HourDial = require("../hourDial/hourDial.model.js");

const postTask = async (req, res) => {

    try {
        const {idHourDial} = req.params;

        const newTask = await new Task(req.body);
        await newTask.save();

        const hourDialUpdate = await HourDial.findById(idHourDial);
        hourDialUpdate.tasks.push(newTask._id);

        const hourDialUpdated = await HourDial.findByIdAndUpdate(idHourDial, hourDialUpdate, {new: true}).populate("tasks");

        return res.json({hourDialUpdated, newTask});

    } catch (error) {
        res.json(error)
    }

}


module.exports = { postTask }