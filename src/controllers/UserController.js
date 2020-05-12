import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user';

const secret = process.env.SECRET;

export const registerUser = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json({
			errors: errors.array({ onlyFirstError: true }),
		});
	}

	const { name, password, email } = req.body;

	try {
		const encryptedPassword = await bcrypt.hash(password, 12);

		const user = new User({
			login: name,
			password: encryptedPassword,
			email,
			role: 'USER',
			createDate: Date.now(),
		});

		const savedUser = await user.save();

		res.status(200).json({
			message: 'User created',
			id: savedUser._id,
		});
	} catch (err) {
		errors.array().push({ msg: `Server error: ${err.toString()}` });
		return res.status(500).json({ errors });
	}
};

export const loginUser = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json({
			errors: errors.array({ onlyFirstError: true }),
		});
	}

	const { _id: id, email, login } = req.loggedUser;

	try {
		const token = jwt.sign(
			{
				id,
				email,
				login,
			},
			secret
		);

		res.cookie('token', token, {
			maxAge: 60 * 60 * 1000,
			httpOnly: true,
		});

		res.status(200).json({ msg: 'Logged successful' });
	} catch (err) {
		errors.array().push({ msg: `Server error: ${err.toString()}` });
		return res.status(500).json({ errors });
	}
};

export const verifyToken = async (req, res, next) => {
	const token = req.cookies.token || '';
	const errors = [];

	try {
		if (!token) {
			errors.push({ msg: 'You need to Login' });

			return res.status(401).json({ errors });
		}
		const decrypt = await jwt.verify(token, process.env.SECRET);
		req.user = {
			id: decrypt.id,
			email: decrypt.email,
			login: decrypt.login,
		};
		next();
	} catch (err) {
		errors.push({ msg: `Server error: ${err.toString()}` });
		return res.status(500).json({ errors });
	}
};

export const getUsers = async (req, res, next) => {
	const withoutMe = req.query.withoutMe;
	const loggedUserId = req.user.id;
	const errors = [];

	try {
		const dbUsers = await User.find();
		const users = dbUsers
			.filter((user) => (withoutMe ? user.id !== loggedUserId : true))
			.map((user) => ({ id: user._id, name: user.login }));

		res.status(200).json({
			users,
		});
	} catch (err) {
		errors.push({ msg: `Server error: ${err.toString()}` });
		return res.status(500).json({ errors });
	}
};

export default registerUser;
