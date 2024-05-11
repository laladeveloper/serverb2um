import expressAsyncHandler from "express-async-handler";
import User from "../models/user.js";
import { sendToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const allUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      message: `There are following users`,
      users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `there is following error`,
      error,
    });
  }
};

export const createUser = async (req, res) => {
  const { fname, lname, email, username, password } = req.body;
  console.log(fname, lname, email, username, password);
  let user = await User.findOne({
    $or: [
      { username },
      { email }, // Check if the input matches the 'email' field as well
    ],
  }).select("-password");
  if (!user) {
    try {
      const saltRounds = 7; // Controls how computationally expensive hashing is
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = new User({
        fname,
        lname,
        email,
        username,
        password: hashedPassword,
      });
      await user.save();
      const token = await user.getJwtToken();

      res.status(200).json({
        success: true,
        message: `Welcome ${user.username} `,
        user,
        token,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
        error,
      });
    }
  } else {
    console.log("user exist in db" + user);
    res.status(200).json({
      success: false,
      message: `User already exist `,
    });
  }
};

export const getMe = expressAsyncHandler(async (req, res) => {
  const me = req.user;
  if (me) {
    res.status(200).json({
      success: true,
      message: `Welcome back ${me.username}`,
      me,
    });
  } else {
    res.status(200).json({
      success: false,
      message: `user not found`,
    });
  }
});

export const getById = expressAsyncHandler(async (req, res) => {
  // const userId = "663540c7754e76fe79df2b69";
  const userId = req.params.username;
  const user = await User.findById(userId);
  const token = await user.getJwtToken();

  res.status(200).json({
    success: true,
    message: `Welcome ${user.username} `,
    user,
    token,
  });
});

export const getByUsername = expressAsyncHandler(async (req, res) => {
  // const userId = "663540c7754e76fe79df2b69";
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    // const token = await user.getJwtToken();
    res.status(200).json({
      success: true,
      message: `Welcome ${user.username} `,
      user,
      // token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: `try again `,

      // token,
    });
  }
});

export const deleteByUsername = expressAsyncHandler(async (req, res) => {
  // const userId = "663540c7754e76fe79df2b69";
  const { username } = req.params;
  try {
    const user = await User.findOneAndDelete({ username });
    // const token = await user.getJwtToken();
    res.status(200).json({
      success: true,
      message: `${username} deleted Successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: `try again `,

      // token,
    });
  }
});

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [
        { username },
        { email: username }, // Check if the input matches the 'email' field as well
      ],
    });
    // const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: `Invalid email or password`,
      });
    }
    console.log("found user" + user);
    // Compare password with hashed password
    console.log(`Compare password with hashed password`);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("check password" + isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: `Invalid email or username or password`,
      });
    }
    const token = await user.getJwtToken();

    res.status(200).json({
      success: true,
      message: `Welcome ${user.username} `,
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: "ther is error",
      error,
    });
  }
};

// random guys

// Function to generate random username
const generateRandomUsername = () => {
  const randomNumber = Math.floor(Math.random() * 1000 * Math.random() * 10);
  return `user_${randomNumber}`;
};

// Function to generate random email
const generateRandomEmail = () => {
  const randomNumber = Math.floor(Math.random() * 100 * Math.random() * 10);
  return `user_${randomNumber}@example.com`;
};

// Function to generate random users
const generateRandomUsers = async (count) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    const randomUsername = generateRandomUsername();
    const randomEmail = generateRandomEmail();
    const saltRounds = 7;
    const hashedPassword = await bcrypt.hash("password", saltRounds); // Set a default password
    const newUser = new User({
      fname: "Random",
      lname: "User",
      email: randomEmail,
      username: randomUsername,
      password: hashedPassword,
    });
    await newUser.save();
    users.push(newUser);
  }
  return users;
};

export const createRandomUsers = expressAsyncHandler(async (req, res) => {
  const { count } = req.params;
  const parsedCount = parseInt(count, 10); // Parse the count as an integer
  if (isNaN(parsedCount)) {
    return res.status(400).json({
      success: false,
      message: "Invalid count provided",
    });
  }

  try {
    const createdUsers = await generateRandomUsers(parsedCount);
    res.status(200).json({
      success: true,
      message: `Successfully created ${parsedCount} random users`,
      users: createdUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating random users",
      error: error.message,
    });
  }
});
