import Product from "../models/product";

export const addProduct = async (req, res, next) => {
	try {
		const { name, type } = req.body;

		const product = new Product({
			name,
			type,
		});

		const savedProduct = await product.save();

		res.status(200).json({
			created: "Product created",
			savedProduct,
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

export const getProductList = async (req, res, next) => {
	try {
		const productList = await Product.find();

		res.status(200).json({
			productList,
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};
