import List from '../models/list';
import User from '../models/user';

export const addList = async (req, res, next) => {
	try {
		const user = req.user;
		const { listName, priority, shared } = req.body;

		const sharedIds = shared.map((user) => user.id);
		const sharedUsers = await User.find({ _id: { $in: sharedIds } });

		const mapedSharedUsers = sharedUsers.map((user) => ({
			login: user.login,
		}));

		const list = new List({
			userId: user.id,
			listName,
			priority,
			shared: mapedSharedUsers,
		});

		const savedList = await list.save();

		res.status(200).json({
			created: 'List created',
			savedList,
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

export const getList = async (req, res, next) => {
	const user = req.user;

	try {
		const list = await List.find({ userId: user.id });

		res.status(200).json({
			shoppingList: list,
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

export const deleteList = async (req, res, next) => {
	const { id } = req.body;

	try {
		await List.findByIdAndDelete(id);

		res.status(200).json({
			msg: `List with id: ${id} successfully deleted`,
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};
