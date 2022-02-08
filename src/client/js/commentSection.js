import { async } from "regenerator-runtime";

const videoContainer = document.getElementById("videoContainer");

const form = document.getElementById("commentForm");

const comment = document.getElementById("videoComment");

const deleteComment = document.querySelectorAll(".video__comment__delete");

const addComment = (text, id) => {
	const videoComments = document.querySelector(".video__comments ul");
	const newComment = document.createElement("li");
	newComment.dataset.id = id;
	newComment.className = "video__comment";
	const icon = document.createElement("i");
	icon.className = "fas fa-comment";
	const span = document.createElement("span");
	span.innerText = ` ${text}`;
	const button = document.createElement("button");
	button.id = "deleteComment";
	const icon2 = document.createElement("i");
	icon2.className = "fas fa-trash-alt";
	button.appendChild(icon2);
	newComment.appendChild(icon);
	newComment.appendChild(span);
	newComment.appendChild(button);
	videoComments.prepend(newComment);

	button.addEventListener("click", handleDelete);
};

const deleteCom = (commentLi) => {
	const videoComments = document.querySelector(".video__comments ul");
	videoComments.removeChild(commentLi);
};

const handleSubmit = async (event) => {
	event.preventDefault();
	const textarea = form.querySelector("textarea");
	const text = textarea.value;
	const id = videoContainer.dataset.id;
	if (text === "") {
		return;
	}
	const response = await fetch(`/api/videos/${id}/add-comment`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ text }),
	});
	if (response.status === 201) {
		textarea.value = null;
		const { newCommentId } = await response.json();
		addComment(text, newCommentId);
	}
};

const handleDelete = async (event) => {
	const commentId = event.path[2].dataset.id;
	const videoId = videoContainer.dataset.id;
	const response = await fetch(`/api/comments/${commentId}/delete-comment`, {
		method: "DELETE",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify({ videoId }),
	});
	if (response.status === 201) {
		deleteCom(event.path[2]);
	}
};

if (form) {
	form.addEventListener("submit", handleSubmit);
	if (comment) {
		for (let i = 0; i < deleteComment.length; i++) {
			deleteComment[i].addEventListener("click", handleDelete);
		}
	}
}
