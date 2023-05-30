const sound = document.querySelector(".sound");
const play = document.querySelector(".play");
const outline = document.querySelector(".moving-outline circle");
const video = document.querySelector(".background-video video");
const timeSelect = document.querySelectorAll(".time-select button");
//sounds
const sounds = document.querySelectorAll(".sound-picker button");
//Time Display
const timeDisplay = document.querySelector(".time-display");
//Get Outline length
const outlineLength = outline.getTotalLength();
//Duration
let fakeDuration = 600;

outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;

//choosing a sound

sounds.forEach((sound) => {
  sound.addEventListener("click", function () {
    sound.src = this.getAttribute("data-sound");
    video.src = this.getAttribute("data-video");
    checkPlaying(sound);
  });
});
play.addEventListener("click", () => {
  checkPlaying(sound);
});

//Time selecting
timeSelect.forEach((btn) => {
  btn.addEventListener("click", function () {
    fakeDuration = this.getAttribute("data-time");
    timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}: ${Math.floor(
      fakeDuration % 60
    )}`;
  });
});

//Play and pause function
const checkPlaying = () => {
  if (sound.paused) {
    sound.play();
    play.src = "./svg/pause.svg";
    video.play();
  } else {
    sound.pause();
    play.src = "./svg/play.svg";
    video.pause();
  }
};
sound.ontimeupdate = () => {
  let currTime = sound.currentTime;
  let elapsed = fakeDuration - currTime;
  let seconds = Math.floor(elapsed % 60);
  let minutes = Math.floor(elapsed / 60);

  //Circle Animation
  let progress = outlineLength - (currTime / fakeDuration) * outlineLength;
  outline.style.strokeDashoffset = progress;

  //Displaying seconds and minutes
  timeDisplay.textContent = `${minutes}:${seconds}`;
  if (currTime >= fakeDuration) {
    sound.pause();
    sound.currentTime = 0;
    play.src = "./svg/pause.svg";
    video.pause();
  }
};
