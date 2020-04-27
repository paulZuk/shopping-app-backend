import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const listSchema = new Schema({
    userId: String,
    listName: String,
    priority: String,
    shared: [String],
    items:[]
});

export default mongoose.model('List', listSchema);