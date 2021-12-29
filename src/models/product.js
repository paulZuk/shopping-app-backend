import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const ProductSchema = new Schema({
	name: String,
	type: String
});

export default mongoose.model('Product', ProductSchema);
