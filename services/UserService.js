const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const axios = require("axios");

exports.getAllUsers = async () => {
  return await UserModel.find();
};

exports.createUser = async (user) => {
  const existingUser = await UserModel.findOne({ username: user.username });
  if (existingUser) {
    throw new Error("Username already exists");
  }
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;

  const newUser = await UserModel.create(user);

  try {
    const cart = await axios.post("http://localhost:3003/cart/", {
      userId: newUser.id,
    });

  } catch (err) {
    deleteUser = await UserModel.findByIdAndDelete(newUser.id);
    throw new Error("error in creating cart");
  }
  return newUser
};

exports.getUserById = async (id) => {
  return await UserModel.findById(id);
};

exports.updateUserPassword = async (id, user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  return await UserModel.updateOne({_id: id},{ $set: { password: hashedPassword } });
};

exports.deleteUser = async (id) => {
  try {
    deleteCart = await axios.delete(`http://localhost:3003/cart/user/${id}`);
  } catch (err) {
    throw new Error("error in deleting cart");
  }
  return await UserModel.findByIdAndDelete(id);
};


