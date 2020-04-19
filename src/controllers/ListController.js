export const addList = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);
    console.log(req.user);

    res.status(200).json({created: 'created'});
}