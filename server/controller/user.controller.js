import Users from "../model/user.model";
import helperFunction from "../helpers/helperFunction";
import configHolder from "../../config/config";
import jwt from "jsonwebtoken";

const signUp = async (req, res, next) => {
  try {
    const { name, email, mobile, referCode } = req.body;

    let data = { email, name, mobile, referCode };

    await Users.create(data);
    return res.json(helperFunction.responseHandler(true, 200, { data }));
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = jwt.sign(
      { email, password },
      configHolder.jsonSecret
    );

    // const user = await Users.findOne({username: username}, 'username');
    if (email == "admin@voidx.com" && password == "admin@style") {
      return res.json(helperFunction.responseHandler(true, token));
    } else {
      return res.json(helperFunction.responseHandler(false, "user is invalid"));
    }
  } catch (e) {
    next(e);
  }
};

const userHelper = {
  signUp,
  login
};
export default userHelper;
