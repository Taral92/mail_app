const { userModel } = require("../models/Usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password)
      return res.json({ messgae: "require all fields", success: false });
    const userx = await userModel.findOne({ email });

    if (userx)
      return res
        .status(400)
        .json({ message: "user already exists", success: false });

    const hashpassword = await bcrypt.hash(password, 10);
    const ProfilePhoto = "https://avatar.iran.liara.run/public/boy";
    await userModel.create({
      fullname,
      email,
      password: hashpassword,
      ProfilePhoto,
    });
    const tokendata = { newemail: email };
    const token = jwt.sign(tokendata, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({ message: "your account create successgully", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ message: "internal error in register", success: false });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(401)
        .json({ message: "Incorrect email or password", success: false });

    const ispasswordmatch = await bcrypt.compare(password, user.password);
    if (!ispasswordmatch)
      return res
        .status(201)
        .json({ message: "password is wrong", success: false });
    const tokendata = {
      userId: user._id,
    };
    const token = jwt.sign(tokendata, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: `${user.fullname} logged in successfully`,
        user,
        success: true,
      });
  } catch (error) {
    res.json({ message: "error in login" });
  }
};
const logoout = async (req, res) => {
  try {
    res
      .status(201)
      .cookie("token", "", {
        expires: new Date(0),
        maxAge: 0,
        httpOnly: true,
        secure: true,
      })
      .json({ message: "logout successfully", success: true });
  } catch (error) {
    res.status(500).json({ messsage: "error in logoout", success: false });
  }
};
module.exports = { register, login, logoout };
