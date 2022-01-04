import express from "express";

const PORT = 4000;

const app = express();

app.get(
	"/",
	(req, res, next) => {
		console.log(`going to http://localhost:${PORT}${req.url}`);
		next();
	},
	(req, res, next) => {
		console.log("as;ldkfjsd;lkfjasdf;lkj");
		next();
	},
	(req, res) => {
		return res.end();
	}
);

const handleListening = () =>
	console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
