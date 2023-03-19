const express = require("express");
const User = require("../models/User");
const user_router = express.Router();

user_router.get("/", async (req, res) => {
	// console.log("in req")
	const users = await User.find();
	res.json(users);
});

user_router.get("/:id", async (req, res) => {
	// console.log(typeof(req.params.id))
	const user = await User.findById(req.params.id);
	res.json(user);
});

user_router.post("/", async (req, res) => {
	let user = await User.find({
		email: req.body.email,
		password: req.body.password,
	});
	console.log(req.body);
	console.log(user);
	if (user.length !== 0) {
		user = "Please enter a non-used email!";
	} else {
		let imgURL = null;
		if (req.body.img_url == "") {
			imgURL =
				"https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png";
		} else {
			imgURL = req.body.img_url;
		}
		user = new User({
			username: req.body.username,
			fullname: req.body.fullname,
			email: req.body.email,
			password: req.body.password,
			city: req.body.city,
			address: req.body.address,
			gender: req.body.gender,
			phone_number: req.body.phone_number,
			img_url: imgURL,
			cart: [],
		});
		await user.save();
		console.log("User saved!");
	}

	res.json(user);
});

user_router.put("/:id", async (req, res) => {
	const user = await User.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			updatedAt: Date.now(),
		},
		{ new: true }
	);
	res.json(user);
});

user_router.delete("/:id", async (req, res) => {
	await User.deleteOne({ _id: req.params.id });
	const message = "User deleted successfully";
	console.log(message);
	res.json({ message });
});

module.exports = user_router;
