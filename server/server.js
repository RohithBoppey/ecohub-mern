// import required modules
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// All different routes for the application
const user_router = require("./routes/user_routes");
const admin_router = require("./routes/admin_router");
const product_router = require("./routes/product_router");
const message_router = require("./routes/message_router");
const mailer_router = require("./routes/mailer_routes");
const article_router = require("./routes/article_router");

// create express app
const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(cors());

// set up MongoDB connection
mongoose
	.connect(
		"mongodb+srv://RohithBoppey:RohithBoppey@ecohub.isryz.mongodb.net/ECOHUB",
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("Could not connect to MongoDB", err));

app.use("/users/", user_router);
app.use("/admins", admin_router);
app.use("/products/", product_router);
app.use("/messages/", message_router);
app.use("/mailer/", mailer_router);
app.use('/articles/', article_router);

// start server
const PORT = 5000;
app.listen(5000, () => {
	console.log(`Server started on port ${PORT}`);
});
