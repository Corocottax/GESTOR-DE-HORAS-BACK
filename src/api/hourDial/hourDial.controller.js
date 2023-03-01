const User = require("../user/user.model");
const HourDial = require("./hourDial.model");

const createHourDial = async (req, res) => {

    try {
        const { idUser } = req.params; 

        const newHourDial = await new HourDial(req.body);
        newHourDial.save();
        console.log(newHourDial);
        const userUpdate = await User.findById(idUser);
        userUpdate.hourDials.push(newHourDial._id);
        console.log(userUpdate);

        const userUpdated = await User.findByIdAndUpdate(idUser, userUpdate, {new: true}).populate({
            path : 'hourDials',
            populate : {
              path : 'tasks'
            }
          });

        return res.json({userUpdated, newHourDial});

    } catch (error) {
        return res.json({mensaje: "error al crear el hourDial", error: error})
    }

}

const hourDialUpdate = async (req, res) => {

    try {
        

        const {id} = req.params;

        const newHourDial = req.body;
        const hourDialUpdated = await HourDial.findByIdAndUpdate(id, newHourDial, {new: true});

        return res.json(hourDialUpdated);

    } catch (error) {
        return res.json({mensaje: "error al modificar el hourDial", error: error})
    }

}

module.exports = { createHourDial, hourDialUpdate };