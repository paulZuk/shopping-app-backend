import List from "../models/list";
import User from "../models/user";

export const addList = async (req, res, next) => {
  try {
    const user = req.user;
    const { listName, priority, shared } = req.body;

    const sharedIds = shared.map((user) => user.id);
    const sharedUsers = await User.find({ _id: { $in: sharedIds } });

    const list = new List({
      userId: user.id,
      listName,
      priority,
      shared: sharedUsers,
    });

    const savedList = await list.save();

    res.status(200).json({
      created: "List created",
      id: savedList._id,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
