import bcrypt from "bcrypt";
import expressAsyncHandler from "express-async-handler";
import User from "../models/user.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import {
  getHtmlTemplate,
  getloginEmail,
  getSignupEmail,
  sendEmail,
} from "../utils/sendEmail.js";
import generateUniqueUID from "../utils/uidGenerator.js";



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
  const uid = await generateUniqueUID(User);
  const { fname, lname, email, username, password } = req.body;
  // console.log(fname, lname, email, username, password);
  let user = await User.findOne({
    $or: [
      { username },
      { email }, // Check if the input matches the 'email' field as well
    ],
  });

  if (!user) {
    try {
      const saltRounds = 7; // Controls how computationally expensive hashing is
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const avatarPath = req.file?.path;
      const avatarPic = await uploadOnCloudinary(avatarPath, "users/avatar");

      const url = `${avatarPic?.secure_url}` || "";

      const public_id = `${avatarPic?.public_id}` || "";

      const user = new User({
        uid,
        fname,
        lname,
        email,
        username,
        password: hashedPassword,
        avatar: {
          url,
          public_id,
        },
      });
      await user.save();
      const token = await user.getJwtToken();
      const number = Math.random();
      const otp = Math.floor(number * 10000);

      const html = getSignupEmail(username, otp);
      sendEmail(
        `${user.email}`,
        "Welcome to B2UM",
        "Welcome to the world Best platform for buying and selling online assets",
        html
      );

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
export const updateMe = expressAsyncHandler(async (req, res) => {
  const me = req.user;
  const userID = me?.id;
  console.log(userID);
  const { fname, lname, username, email } = req.body;
  // console.log(fname, lname, username, email);
  const update = { fname, lname, username, email };

  if (me) {
    const updatedMe = await User.findByIdAndUpdate(userID, update, {
      returnOriginal: false,
    });
    const token = await updatedMe.getJwtToken();
    res.status(200).json({
      success: true,
      message: `Succefully updated ${updatedMe.username}`,
      user: updatedMe,
      token,
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
  const { id } = req.params;
  let user;
  try {
    user = await User.findOne({uid:id})
    if (!user) {
      console.log(`!user statement run`);
      user = await User.findById( id );
    }
    const token = await user.getJwtToken();

    res.status(200).json({
      success: true,
      message: `Welcome ${user.username} `,
      user,
      token,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: `User id does not exist `,
      error
    });
  }
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
    // console.log("found user" + user);
    // Compare password with hashed password
    // console.log(`Compare password with hashed password`);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    // console.log("check password" + isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: `Invalid email or username or password`,
      });
    }
    const token = await user.getJwtToken();
    // const username = user?.username;
    const html = getloginEmail(user.username);
    if (process.env.SMTP_PORT) {
      console.log(`sending email`);
      sendEmail(
        `${user.email}`,
        "Welcome Back to B2UM",
        "Welcome to the world Best platform for buying and selling online assets",
        html
      );
    }
  
    res.status(200).json({
      success: true,
      message: `Welcome ${user.username} `,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "there is an error while processing",
      error,
    });
  }
};

export const sellerReq = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const userId = id;
    // console.log(userId);
    const { whatsapp, telegram, dob, cnic, passport } = req.body;
    // console.log(req.files);
    const frontIDPath = req.files?.frontID[0]?.path;
    const rearIDPath = req.files?.rearID[0]?.path;
    console.log(frontIDPath);
    // console.log(rearIDPath);
    // Upload front ID to Cloudinary
    const frontCNIC = await uploadOnCloudinary(frontIDPath, "users/cnic");

    const frontUrl = frontCNIC?.secure_url;
    const frontPublicID = frontCNIC?.public_id;

    const rearCNIC = await uploadOnCloudinary(rearIDPath, "users/cnic");

    const rearUrl = rearCNIC?.secure_url;
    const rearPublicID = rearCNIC?.public_id;

    // console.log({ whatsapp, telegram, dob, cnic, passport });
    const update = {
      whatsapp,
      telegram,
      dob,
      cnic,
      passport,
      cnicFront: {
        url: frontUrl,
        public_id: frontPublicID,
      },
      cnicRear: {
        url: rearUrl,
        public_id: rearPublicID,
      },
      reqSeller: true,
    };

    const user = await User.findByIdAndUpdate(userId, update, {
      returnOriginal: false,
    });
    res.status(200).json({
      success: true,
      message: `Hey ${foundUser?.username}! Your application for seller is Recieved `,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const reqSellers = async (req, res) => {
  const reqs = await User.find({ reqSeller: true });
  res.status(200).json({
    success: true,
    message: `Here are seller Requests `,
    reqs,
  });
};

export const reqSellersAcp = async (req, res) => {
  const { id } = req.params;
  const update = {
    reqSeller: false,
    role: "seller",
    isVerifiedSeller: true,
  };

  try {
    const user = await User.findByIdAndUpdate(id, update, {
      returnOriginal: false,
    });

    res.status(200).json({
      success: true,
      message: `${user.username}'s request accepted as Seller and Verified `,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Wrong userID `,
    });
  }
};


export const doesUserUIDExist = async (req, res) => {
  try {
    // Find all products
    const usersWithoutUID = await User.find({ uid: { $exists: false } });

    // Iterate over each product and assign a UID
    // for (const product of productsWithoutUID) {
    //   const uid = await generateUniqueUID(Product);
    //   product.uid = uid;
    //   await product.save();
    // }

    res.status(200).json({
      success: true,
      message: "These users dont't have uid",
      updatedCount: usersWithoutUID.length,
      usersWithoutUID,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while assigning UIDs",
      error: error.message,
    });
  }
};



export const assignUIDsToUsers = async (req, res) => {
  try {
    // Find all products
    const usersWithoutUID = await User.find({ uid: { $exists: false } });
    let updatedCount = 0;

    // Iterate over each user and assign a UID
    for (const user of usersWithoutUID) {
      // Validate username before assigning UID
      if (!user.username || user.username.length < 4) {
        console.warn(`Skipping user with invalid username: ${user.username}`);
        continue; // Skip this user and continue with the next one
      }

      const uid = await generateUniqueUID(User);
      user.uid = uid;
      await user.save();
      updatedCount++;
    }


    res.status(200).json({
      success: true,
      message: `UIDs assigned to all ${usersWithoutUID.length} users without UID`,
      updatedCount: usersWithoutUID.length,
      usersWithoutUID,
      updatedCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while assigning UIDs",
      error: error.message,
    });
  }
};
