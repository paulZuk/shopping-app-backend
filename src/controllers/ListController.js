import List from '../models/list';
import User from "../models/user";

export const addList = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log(token);
        console.log(req.user);
    
        const user = req.user;
        const { listName, priority, shared } = req.body;

        const users = await User.find({email: {$in: shared}});


        console.log(sharedUsers);
    
        // const list = new List({
        //     listName,
        //     priority,
        //     userId: user.id
        // });
        res.status(200).json({created: 'created'});
    } catch (err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
    }
}