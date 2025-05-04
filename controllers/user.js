const db = require("../models");
const Users = db.User;
const Profile = db.Profile;
const bcrypt = require("bcryptjs");
const { userValidation } = require("../validations/userValidation");

const create = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashPasswords = bcrypt.hashSync(password, salt);
  const { error } = userValidation(req.body);

  if (error) {
    return res.status(422).json(error.details);
  }

  const user = {
    name: name,
    email: email,
    password: hashPasswords,
  };

  try {
    const results = await Users.create(user);
    res.json({
      message: "User created successfully.",
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Some error occurred while creating the Book.",
      data: null,
    });
  }
};

// find all users
const findAll = async (req, res) => {

  try {
    const users = await Users.findAll({
      attributes: { exclude: ["password"] },
    });
    res.status(200).json({
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Some error occurred while retrieving books.",
      data: null,
    });
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    await Users.destroy({
      where: {
        id: 1,
      },
    });
    return res.status(200).json({ message: "success" });
  } catch (error) {
    res.json(error);
  }
};

const findProfile = async (req, res) => {
  const profile = await Users.findAll({
    include: [
      {
        model: Profile,
        attributes: { exclude: ["image", "createdAt", "updatedAt"] },
      },
    ],
  });
  return res.json(profile);
};

module.exports = { create, findAll, findProfile, deleteUser };
