const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");
const textarea = document.getElementById("textarea");

let volumeValue = 0.5;
let controlsTimeout = null;
let controlsMovementTimeout = null;

video.volume = volumeValue;

const handlePlayClick = (e) => {
	if (video.paused) {
		video.play();
	} else {
		video.pause();
	}
	playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMute = (e) => {
	if (video.muted) {
		video.muted = false;
	} else {
		video.muted = true;
	}
	muteBtnIcon.classList = video.muted
		? "fas fa-volume-mute"
		: "fas fa-volume-up";
	volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (event) => {
	const {
		target: { value },
	} = event;
	if (video.muted) {
		video.muted = false;
		muteBtnIcon.classList = "fas fa-volume-up";
	}
	volumeValue = value;
	video.volume = value;

	if (volumeValue == 0) {
		video.muted = true;
		muteBtnIcon.classList = "fas fa-volume-mute";
	}
};

if (!isNaN(video.duration)) {
	video.addEventListener("canplay", handleLoadedData);
	handleLoadedMetaData();
}

const formatTime = (seconds) => {
	if (seconds >= 3600) {
		return new Date(seconds * 1000).toISOString().substring(11, 19);
	} else {
		return new Date(seconds * 1000).toISOString().substring(14, 19);
	}
};

const handleLoadedMetaData = () => {
	totalTime.innerText = formatTime(Math.floor(video.duration));
	timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
	currentTime.innerText = formatTime(Math.floor(video.currentTime));
	timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (event) => {
	const {
		target: { value },
	} = event;
	video.currentTime = value;
};

const handleFullScreen = () => {
	const fullScreen = document.fullscreenElement;
	if (!fullScreen) {
		videoContainer.requestFullscreen();
		fullScreenIcon.classList = "fas fa-compress";
	} else {
		document.exitFullscreen();
		fullScreenIcon.classList = "fas fa-expand";
	}
};

const hideControls = () => {
	videoControls.classList.remove("showing");
};

const handleMouseMove = (event) => {
	if (controlsTimeout) {
		clearTimeout(controlsTimeout);
		controlsTimeout = null;
	}
	if (controlsMovementTimeout) {
		clearTimeout(controlsMovementTimeout);
		controlsMovementTimeout = null;
	}
	videoControls.classList.add("showing");
	controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
	controlsTimeout = setTimeout(hideControls, 3000);
};

const handleKey = (e) => {
	if (e.key === " " && e.target.id !== "textarea") {
		if (video.paused) {
			video.play();
		} else {
			video.pause();
		}
		playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
	}
	if (e.key === "f" && e.target.id !== "textarea") {
		videoContainer.requestFullscreen();
		fullScreenIcon.classList = "fas fa-compress";
	}
	if (e.key === "escape") {
		document.exitFullscreen();
		fullScreenIcon.classList = "fas fa-expand";
	}
};

const handelEnded = () => {
	const { id } = videoContainer.dataset;
	fetch(`/api/videos/${id}/view`, {
		method: "POST",
	});
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadeddata", handleLoadedMetaData);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("ended", handelEnded);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullScreen);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
window.addEventListener("keydown", handleKey);
