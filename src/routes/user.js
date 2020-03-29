import { Router } from 'express';
import User from '../models/user';
import { registerUser } from '../controllers/UserController';
import { body } from 'express-validator/check'

const router = Router();

router.post('/', [
    body('name').notEmpty(),
    body('password').notEmpty(),
    body('email')
        .isEmail()
        .custom((value) => {
            return User.findOne({email: value}).then(user => {
                if(user) {
                    return Promise.reject('User already exist');
                }
            })
    }),
],
registerUser);

export default router;