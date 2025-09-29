// TODO: add seekbar navigation, volume switch, hours display, thumbnails on seekbar (remember the netflix example)
// TODO: ideally write your own styles

const media = document.querySelector("video");
const controls = document.querySelector(".controls");

const play = document.querySelector(".play");
const stop = document.querySelector(".stop");
const rewind = document.querySelector(".rwd");
const forward = document.querySelector(".fwd");

const timerWrapper = document.querySelector(".timer");
const timer = document.querySelector(".timer span");
const timerBar = document.querySelector(".timer div");

let ForwardInterval;
let RewindInterval;

media.removeAttribute("controls");
controls.style.visibility = "visible";

play.addEventListener("click", playPausePlayer);

function playPausePlayer() {
  rewind.classList.remove("active");
  forward.classList.remove("active");
  clearInterval(ForwardInterval);
  clearInterval(RewindInterval);
  if (media.paused) {
    play.setAttribute("data-icon", "u");
    media.play();
  } else {
    play.setAttribute("data-icon", "P");
    media.pause();
  }
}

stop.addEventListener("click", stopMedia);
media.addEventListener("ended", stopMedia);

function stopMedia() {
  media.pause();
  media.currentTime = 0;
  play.setAttribute("data-icon", "P");
  rewind.classList.remove("active");
  forward.classList.remove("active");
  clearInterval(ForwardInterval);
  clearInterval(RewindInterval);
}

rewind.addEventListener("click", mediaBackward);
forward.addEventListener("click", mediaForward);

function mediaBackward() {
  clearInterval(ForwardInterval);
  forward.classList.remove("active");
  if (rewind.classList.contains("active")) {
    rewind.classList.remove("active");
    clearInterval(RewindInterval);
    play.setAttribute("data-icon", "u");
    media.play();
  } else {
    rewind.classList.add("active");
    media.pause();
    RewindInterval = setInterval(windBackward, 200);
  }
}

function windBackward() {
  if (media.currentTime <= 3) {
    stopMedia();
  } else {
    media.currentTime -= 3;
  }
}

function mediaForward() {
  clearInterval(RewindInterval);
  rewind.classList.remove("active");
  if (forward.classList.contains("active")) {
    forward.classList.remove("active");
    clearInterval(ForwardInterval);
    play.setAttribute("data-icon", "u");
    media.play();
  } else {
    forward.classList.add("active");
    media.pause();
    ForwardInterval = setInterval(windForward, 200);
  }
}

function windForward() {
  if (media.currentTime >= media.duration - 3) {
    stopMedia();
  } else {
    media.currentTime += 3;
  }
}

media.addEventListener("timeupdate", setTime);

function setTime() {
  const minutes = Math.floor(media.currentTime / 60);
  const seconds = Math.floor(media.currentTime % 60);

  const minuteValue = minutes.toString().padStart(2, "0");
  const secondValue = seconds.toString().padStart(2, "0");

  const mediaTime = `${minuteValue}:${secondValue}`;
  timer.textContent = mediaTime;

  const barLength = timerWrapper.clientWidth * (media.currentTime / media.duration);
  timerBar.style.width = `${barLength}px`;
}
