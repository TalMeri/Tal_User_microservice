const express = require("express");
const {
    getAllUsers,
    createUser,
    getUserById,
    updateUserPassword,
    deleteUser,
} = require("../controllers/UserController");

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUserById).put(updateUserPassword).delete(deleteUser);

module.exports = router;
