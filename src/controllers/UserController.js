import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user";

const secret = process.env.SECRET;

export const registerUser = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array({ onlyFirstError: true }),
    });
  }

  const { name, password, email } = req.body;

  bcrypt
    .hash(password, 12)
    .then((hashPass) => {
      const user = new User({
        login: name,
        password: hashPass,
        email,
        role: "USER",
        createDate: Date.now(),
      });

      return user.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "User created",
        id: result._id,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

export const loginUser = (req, res, next) => {
  const { login, password } = req.body;
  let loggedUser;

  User.findOne({ login })
    .then((user) => {
      if (!user) {
        const error = new Error("User with this login not exist in database.");
        error.statusCode = 500;
        throw error;
      }

      loggedUser = user;

      return bcrypt.compare(password, user.password);
    })
    .then((isVerify) => {
      if (!isVerify) {
        const error = new Error("Password is incorrect!");
        error.statusCode = 401;
        throw error;
      }

      const token = jwt.sign(
        {
          id: loggedUser._id,
          email: loggedUser.email,
          login: loggedUser.login,
        },
        secret
      );

      res.cookie("token", token, {
        expires: new Date(Date.now() + 90000),
        httpOnly: true,
        secure: false,
      });

      res.status(200).json({ msg: "Logged successful" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

export default registerUser;
