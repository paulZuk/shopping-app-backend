import { Router } from 'express';
import User from '../models/user';
import {
	registerUser,
	getUsers,
	verifyToken,
} from '../controllers/UserController';
import { body } from 'express-validator/check';

const usersRouter = Router();

usersRouter.post(
	'/',
	[
		body('name')
			.notEmpty()
			.withMessage('Name should not be empty.')
			.custom((value) => {
				return User.findOne({ login: value }).then((user) => {
					if (user) {
						return Promise.reject(
							`User with login: ${value} already exist.`
						);
					}
				});
			}),
		body('password')
			.notEmpty()
			.withMessage('Password should not be empty.'),
		body('email')
			.notEmpty()
			.withMessage('E-mail should not be empty.')
			.isEmail()
			.withMessage('E-mail is incorrect check and try again.')
			.custom((value) => {
				return User.findOne({ email: value }).then((user) => {
					if (user) {
						return Promise.reject(
							`User with email: ${value} already exist please select different and try again`
						);
					}
				});
			}),
	],
	registerUser
);

usersRouter.get('/', verifyToken, getUsers);

export default usersRouter;
