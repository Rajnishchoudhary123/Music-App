const express = require('express');
const { registerUser, loginUser, myProfile, logoutUser, saveToPlayList, deleteUser, getAllUsers } = require('../controller/userController.js');
const isAuth = require('../middlewear/isAuth.js');
const isAdmin = require('../middlewear/isAdmin.js')

const router = express.Router();

router.post("/register" , registerUser)
router.post("/login" , loginUser)
router.get("/me" , isAuth , myProfile)
router.get("/logout" , isAuth , logoutUser)
router.post("/song/:id" , isAuth , saveToPlayList)
router.delete("/:id" , isAuth ,isAdmin , deleteUser)
router.get("/users" , getAllUsers)

module.exports = router;