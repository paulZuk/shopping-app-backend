import List from '../models/list';
import { ObjectID } from 'mongodb';

export const addList = async (req, res, next) => {
	try {
		const user = req.user;
		const { listName, priority, shared } = req.body;

		const list = new List({
			userId: user.id,
			listName,
			priority,
			shared,
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

export const getSingleData = async (req, res, next) => {
	const id = req.query.id;
	try {
		const list = await List.find({ _id: id });

		res.status(200).json({
			...list,
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

	if (req.query.id) {
		getSingleData(req, res, next);
		return;
	}

	try {
		const list = await List.find({
			$or: [
				{ shared: { $elemMatch: { _id: ObjectID(user.id) } } },
				{ userId: user.id },
			],
		});

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

export const editList = async (req, res, next) => {
	const { id, listName, priority, shared } = req.body;

	try {
		await List.findByIdAndUpdate(id, {
			listName,
			priority,
			shared,
		});

		res.status(200).json({
			msg: `List with id: ${id} edited`,
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
