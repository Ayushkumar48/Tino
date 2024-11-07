import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema({
	name: String,
	username: String,
	email: String,
	password: String
});

userSchema.methods.createSession = async function () {
	const sessionId = uuidv4();
	return sessionId;
};

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
