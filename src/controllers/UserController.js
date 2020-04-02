import { validationResult } from 'express-validator';
import User from '../models/user';

export const registerUser = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422)
            .json({ errors: errors.array({ onlyFirstError: true })});
    }

    const { name, password, email } = req.body;
    const user = new User({
        login: name,
        password,
        email,
        role: 'USER', 
        createDate: Date.now(),
    });

    user.save((err) => {
        console.log(err);
    });

    res.status(200).json({
        message: 'User created'
    });
}

export default registerUser;