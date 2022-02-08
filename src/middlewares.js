import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
	credentials: {
		accessKeyId: process.env.AWS_ID,
		secretAccessKey: process.env.AWS_SECRET,
	},
});

const multerUploader = multerS3({
	s3: s3,
	bucket: "ydtube",
	acl: "public-read",
});

export const protectorMiddleware = (req, res, next) => {
	if (req.session.loggedIn) {
		next();
	} else {
		req.flash("error", "Log in first");
		return res.redirect("/login");
	}
};

export const publicOnlyMiddleware = (req, res, next) => {
	if (!req.session.loggedIn) {
		return next();
	} else {
		req.flash("error", "Not authorized");
		return res.redirect("/");
	}
};

export const avatarUpload = multer({
	dest: "uploads/avatars/",
	limits: {
		filesize: 3000000,
	},
	storage: multerUploader,
});

export const videoUpload = multer({
	dest: "uploads/videos/",
	limits: {
		filesize: 10000000,
	},
	storage: multerUploader,
});
