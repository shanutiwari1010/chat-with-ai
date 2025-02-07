import { Router } from "express";
import * as userController from "../controller/user.controller.js";
import { body } from "express-validator";

const router = Router();

router.post(
  "/register",
  body("email").isEmail().withMessage("email must be a valid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be altleast 6 characters long"),
  userController.creatUserController
);
// router.post(
//   "/login",
//   body("email").isEmail().withMessage("email must be a valid email address"),
//   body("password")
//     .isLength({ min: 6 })
//     .withMessage("password must be altleast 6 characters long"),
//   userController.loginUserController
// );
// router.post("/logout", userController.logoutUserController);

export default router;
