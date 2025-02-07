import userModel from "../models/user.model.js";
import * as userService from "../services/user.service.js";
import { validationResult } from "express-validator";
import redisClient from "../services/redis.service.js";


export const creatUserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await userService.creatUser(req.body);
    const token = await user.generateToken(user._id);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log(req.body, "req")
  try {
    const { email, password } = req.body;


    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = await user.generateToken();

    res.status(200).json({ user, token });
  } catch (error) {
    console.log("errorrrr :" , error)
    res.status(500).json({ error: error.message });
  }
};

export const profileController = async (req, res) => {
  console.log(req.user, "profile")
  try {
    const user = await userModel.findById(req.user._id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logoutController = async (req, res) => {
  try {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    redisClient.set(token,'logout', 'EX', 60 * 60 * 24)
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};