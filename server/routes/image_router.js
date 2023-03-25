const multer = require("multer");
const express = require("express");
const image_router = express.Router();
const fs = require("fs");

const ImageModal = require('../models/ImageModal');

const storage = multer.diskStorage({
	destination: "uploads",
	filename: (req, file, callback) => {
		callback(null, file.originalname);
	},
});

const upload = multer({ storage: storage });

image_router.get("/", (req, res) => {
	res.send("Working fine");
});

image_router.post("/", upload.single("testImage"), (req, res) => {
	// console.log(req.file);
	const img = new ImageModal({
		email: req.body.email,
		name: req.body.name,
		img: {
			data: fs.readFileSync("uploads/" + req.file.filename),
			contentType: "image/png",
		},
	});
	img
		.save()
		.then((resp) => {
			console.log("Image saved in MongoDB");
		})
		.catch((err) => {
			console.log(err, "Error has occured");
		});
	res.send("Sent");
});


module.exports = image_router;
