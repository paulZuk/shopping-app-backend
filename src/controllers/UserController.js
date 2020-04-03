import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import User from '../models/user';

export const registerUser = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422)
            .json({
                errors: errors.array({ onlyFirstError: true })
            });
    }

    const { name, password, email } = req.body;

    bcrypt.hash(password, 12)
        .then(hashPass => {
            const user = new User({
                login: name,
                password: hashPass,
                email,
                role: 'USER',
                createDate: Date.now(),
            });

            return user.save();
        })
        .then(result => {
            res.status(200).json({
                message: 'User created',
                id: result._id
            });
        })
        .catch(err => {
            console.log(err);
        });
}

export default registerUser;