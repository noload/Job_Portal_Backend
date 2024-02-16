import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  const { firstname, email, password, lastname } = req.body;
  //validate
  if (!firstname) {
    next("firstname is required");
  }
  if (!lastname) {
    next("Please provide lastname");
  }
  if (!email) {
    next("Email Not  entered");
  }
  if (!password) {
    next("Password Not given or it is too short");
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    next("Email Already Rigister. Please Login");
  }

  const user = await userModel.create({
    email,
    password,
    lastname,
    firstname,
  });

  //token
  const token = user.createJWT();
  res.status(200).send({
    success: true,
    message: "User created successfully",
    userId: user._id,
    token,
  });
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  //validation
  if (!email || !password) {
    next("Please provide email and password");
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    next("Invalid username or password");
  }

  //compare password
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    next("Invalid username or password");
  }

  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message: "Logen successfully",
    token,
    user,
  });
};
