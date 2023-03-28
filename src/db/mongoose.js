import mongoose from "mongoose";
const connection = {};

(async function dbConnect() {
	if (connection.isConnected) {
		return;
	}

	try {
		const db = await mongoose.connect(process.env.MONGODB_URL, {
			useNewUrlParser: true,
            useUnifiedTopology: true,
		});
		// mongoose.set('strictQuery', false);
		connection.isConnected = db.connections[0].readyState;

		console.log("MongoDB Connected");
	} catch (error) {
		console.log(error);
	}
})();