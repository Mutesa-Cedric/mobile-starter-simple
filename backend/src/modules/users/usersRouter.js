const { Router } = require("express");
const UserController = require("./usersController");
const isAuthenticated = require("../../middlewares/auth");

const router = Router();

router.post("/register", UserController.createUser);
router.post("/login", UserController.login);
router.get("/me", isAuthenticated, UserController.getUser);
router.get("/logout", isAuthenticated, UserController.logout);

const userRouter = router;
module.exports = userRouter;