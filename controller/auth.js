import bcrypt from "bcryptjs";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import e from "express";
export const registerUser = async (req, res) => {
	try {
		const { userName, email, password } = req.body; //destructure data from request body
		const existingUser = await User.findOne({ email: email }); //find user by provided email

		if (existingUser) {
			return res.status(400).json({ msg: "User already exist" });
		}
		const salt = await bcrypt.genSalt();
		const hashPass = await bcrypt.hash(password, salt);
		const newUser = new User({ userName, email, password: hashPass });
		const user = await newUser.save();

		const token = jwt.sign({ id: newUser._id }, process.env.JWT);
		res.status(200).json({ user, token });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const login = async (req, res) => {
	const { userName, password } = req.body;

	try {
		const user = await User.findOne({ userName });
		if (!user) return res.status(400).json({ msg: "User does not exist" });
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
		const token = jwt.sign({ id: user._id }, process.env.JWT);
		res.status(200).json({ token, user });
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
};

export const getAllUsers = async (req, res) => {
	try {
		// this will get all ids except the current user id 
		const users=await User.find({_id: {$ne: req.params.id}}).select([
			"email", "_id", "userName", "avatar"
		])
		res.status(200).json(users);
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
};

export const setAvatar = async (req, res) => {
	try {
		const userId = req.params.id;
		const avatar = req.body.image;
		const userData = await User.findByIdAndUpdate(userId, {
			isAvatarImageSet: true,
			avatar,
		});
		return res.status(200).json({ isSet: userData.isAvatarImageSet, image: userData.avatar });
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
};
