import { Router } from 'express';
import { loginUser } from '../controllers/UserController';
import { body } from 'express-validator/check';
import bcrypt from 'bcrypt';
import User from '../models/user';

const router = Router();

router.post(
	'/',
	[
		body('login')
			.notEmpty()
			.withMessage('Login cannot be empty.')
			.custom(async (value, { req }) => {
				try {
					const loggedUser = await User.findOne({ login: value });
					if (!loggedUser) {
						return Promise.reject(
							`User with login: ${value} is not exist in database.`
						);
					}

					req.loggedUser = loggedUser;
				} catch (err) {
					throw err;
				}
			}),
		body('password')
			.notEmpty()
			.withMessage('Password cannot be empty.')
			.custom(async (value, { req }) => {
				try {
					if (!req.loggedUser) {
						return;
					}
					const verifiedPassword = await bcrypt.compare(
						value,
						req.loggedUser.password
					);

					if (!verifiedPassword) {
						return Promise.reject(
							`Password is incorrect, try again.`
						);
					}
				} catch (err) {
					throw err;
				}
			}),
	],
	loginUser
);

export default router;
