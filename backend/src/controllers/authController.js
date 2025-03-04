import cloudinary from "../config/cloudinary.js";
import { generateToken } from "../config/utils.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    const user = await User.findOne({ email }).exec();

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

//User Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      memberSince: user.createdAt,
      status: user.createdAt ? "Active" : "Inactive",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};


export const logout = (req, res) => {
    try{
        res.cookie('jwt','',{maxAge:0})
        res.status(200).json({message:'Logged out successfully.'})
    }catch(error){
        console.log(error.message);
        res.status(500).json({message:'Internal server error.'})
    }
};


export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!req.file) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(req.file.path);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in updating profile:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const checkAuth = (req, res) => {
  try {
      res.status(200).json({
          _id: req.user._id,
          fullName: req.user.fullName,
          email: req.user.email,
          profilePic: req.user.profilePic,
          memberSince: req.user.createdAt,
          status: req.user ? "Active" : "Inactive",
      });
  } catch (error) {
      console.log("Error in checkAuth controller", error.message);
      res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    if (!email || !oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect old password" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};


export const deleteAccount=async(req,res)=>{
  try{
    const userId=req.user._id;
  const user=await User.findByIdAndDelete(userId)

  if(!user){
    return res.status(404).json({message:'User not found'})
  }

  res.status(200).json({message:'Account deleted successfully'})
  }catch(error){
    res.status(500).json({message:'Server error.Please try again later'})
  }
}



