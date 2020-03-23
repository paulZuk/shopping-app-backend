export const registerUser = (req, res, next) => {
    console.log(req.body);

    res.status(200).json({
        message: 'User created'
    });
}

export default registerUser;