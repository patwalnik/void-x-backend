import express from "express";
const user = express.Router();
import userHelper from "../controller/user.controller";

user.post("/joinus", userHelper.signUp);

user.post("/login", userHelper.login);

export default user;
