import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    listName: String,
    priority: String,
    shared: String,
});

export default mongoose.model('User', userSchema);