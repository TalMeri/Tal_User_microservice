const UserModel = require("../models/User");
const bcrypt = require("bcrypt");

exports.login = async (user) => {
    const existingUser = await UserModel.findOne({ username: user.username });
    if (!existingUser || !bcrypt.compareSync(user.password, existingUser.password)){
        throw Error("Username or Password incorrect")
    }
    return existingUser;
  };