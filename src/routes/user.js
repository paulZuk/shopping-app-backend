import { Router } from "express";
import User from "../models/user";
import { registerUser } from "../controllers/UserController";
import { body } from "express-validator/check";

const router = Router();

router.post(
  "/",
  [
    body("name")
      .notEmpty()
      .custom((value) => {
        return User.findOne({ login: value }).then((user) => {
          console.log(user);
          if (user) {
            return Promise.reject("User with this login already exist.");
          }
        });
      }),
    body("password").notEmpty(),
    body("email")
      .isEmail()
      .custom((value) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject(
              "User with this email already exist please select different and try again"
            );
          }
        });
      }),
  ],
  registerUser
);

export default router;
