const express = require("express");
const { login, register} = require("../controllers/authController");
const {Auth} = require("../middleware/authMiddleware")
const { getUser } = require("../controllers/dashBoardController");
const router = express.Router();
const { validate } = require("../middleware/validatorMiddleware");
const { ErrorHandler } = require("../middleware/ServerErrorHandler");


router.get("/userinfo", Auth, getUser,ErrorHandler);

router.post("/login",validate('loginUser'), login);     //validate middleware 

router.post("/signup",validate('createUser'),register);



module.exports = router;
