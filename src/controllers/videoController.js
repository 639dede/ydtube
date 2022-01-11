export const trending = (req, res) => {
	const videos = [
		{
			title: "First VIdeo",
			rating: 5,
			comments: 2,
			createdAt: "2 minutes ago",
			views: 59,
			id: 1,
		},
		{
			title: "Second VIdeo",
			rating: 5,
			comments: 2,
			createdAt: "2 minutes ago",
			views: 59,
			id: 1,
		},
		{
			title: "Third VIdeo",
			rating: 5,
			comments: 2,
			createdAt: "2 minutes ago",
			views: 59,
			id: 1,
		},
	];
	return res.render("home", { pageTitle: "Home", videos });
};

export const see = (req, res) => {
	return res.render("watch", { pageTitle: "Watch" });
};

export const edit = (req, res) => {
	return res.render("edit", { pageTitle: "Edit" });
};

export const search = (req, res) => res.send("Search");

export const upload = (req, res) => res.send("Upload");

export const deleteVideo = (req, res) => {
	return res.send("Delete Video");
};
