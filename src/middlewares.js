import multer from "multer";

export const localsMiddleware = (req, res, next) => {
	res.locals.loggedIn = Boolean(req.session.loggedIn);
	res.locals.siteName = "YDtube";
	res.locals.loggedInUser = req.session.user;
	next();
};

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
});

export const videoUpload = multer({
	dest: "uploads/videos/",
	limits: {
		filesize: 10000000,
	},
});
