import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  try {
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

    res.status(200).send({
      success: true,
      message: "User created successfully",
      userId: user._id,
    });
  } catch (error) {
    next(error);
  }
};
