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
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
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
		return res.status(500).json(err.toString());
	}
};

export const verifyToken = async (req, res, next) => {
	const token = req.cookies.token || '';
	try {
		if (!token) {
			return res
				.status(401)
				.json({ errors: [{ msg: 'You need to Login' }] });
		}
		const decrypt = await jwt.verify(token, process.env.SECRET);
		req.user = {
			id: decrypt.id,
			email: decrypt.email,
			login: decrypt.login,
		};
		next();
	} catch (err) {
		return res.status(500).json(err.toString());
	}
};

export const getUsers = async (req, res, next) => {
	const withoutMe = req.query.withoutMe;
	const loggedUserId = req.user.id;

	try {
		const dbUsers = await User.find();
		const users = dbUsers
			.filter((user) => (withoutMe ? user.id !== loggedUserId : true))
			.map((user) => ({ id: user._id, name: user.login }));

		res.status(200).json({
			users,
		});
	} catch (err) {
		return res.status(500).json(err.toString());
	}
};

export default registerUser;
