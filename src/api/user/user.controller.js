const User = require("./user.model");
const bcrypt = require("bcrypt");
const { generateSign } = require("../../utils/jwt");

const signUp = async (req, res) => {

  try {

    const newUser = new User(req.body);

    if (req.file) {
      newUser.photo = req.file.path;
    }

    newUser.save();

    return res.json(newUser);

  } catch (error) {
    return res.json({ mensaje: "error haciendo sign up", error: error })
  }

}

const loginUser = async (req, res, next) => {
  try {
    const userDB = await User.findOne({ userName: req.body.userName }).populate({
      path: 'hourDials',
      populate: {
        path: 'tasks'
      }
    });
    if (!userDB) {
      return res.json("Nombre de usuario incorrecto");
    }
    if (bcrypt.compareSync(req.body.password, userDB.password)) {
      const token = generateSign(userDB._id, userDB.userName);
      return res.status(200).json({ token, userDB });
    } else {
      return res.json("contraseña incorrecta")
    }
  } catch (error) {
    return res.json("error en el login")
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const idString = JSON.stringify(req.user._id);
    const idParsed = idParsed.slice(1, idString.length - 1);

    if (idParsed === id) {
      const UserDB = await User.findByIdAndUpdate(id, req.body, { new: true });
      if (!UserDB) {
        return res.json("error encontrando el usuario")
      }
      return res.status(200).json(UserDB);
    } else {
      return res.json("No puedes actualizar un usuario si no eres tu mismo")
    }

  } catch (error) {
    return res.json("error actualizando el user");
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDB = await User.findById(id).populate({
      path: 'hourDials',
      populate: {
        path: 'tasks'
      }
    });
    if (!userDB) {
      return res.json("error en el get del user")
    }
    return res.status(200).json(userDB);
  } catch (error) {
    return res.json("error en el get del user")
  }
};

const checksession = async (req, res) => {

  try {
    
    return res.json(req.user);

  } catch (error) {
    return res.json("fallo al checkear la sesión");
  }

}

module.exports = { signUp, getUser, updateUser, loginUser, checksession }