import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let uri = process.env.MONGODB_URI;

export default async function connectDB() {
	if (!uri) {
		throw new Error('MONGODB_URI is not defined in the .env file');
	}

	if (mongoose.connection.readyState === 1) {
		console.log('DB already connected');
		return mongoose.connection;
	}

	try {
		const connection = await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			serverSelectionTimeoutMS: 30000 // Increase timeout to 30 seconds
		});
		console.log('MongoDB connected');
		return connection;
	} catch (err) {
		console.error('Error connecting to MongoDB:', err);
		throw err;
	}
}

// Optional: Mongoose connection event listeners for better logging
mongoose.connection.on('connected', () => {
	console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
	console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
	console.log('Mongoose disconnected from DB');
});
