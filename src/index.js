import "./styles.scss";
import { initCarousel } from "./components/carousel";

$(function () {
  initCarousel({});
  initCarousel({
    containerId: "#slider",
    observable: false,
    timeout: 5000,
    animationDuration: 1500,
  });

  const player = document.getElementById("video-element");
  const playPauseBtn = document.getElementById("play-pause-button");

  if (player) {
    playPauseBtn.addEventListener("click", playPauseVideo);

    player.addEventListener(
      "play",
      function () {
        // Change the button to be a pause button
        changeButtonType(playPauseBtn, "pause");
      },
      false
    );

    player.addEventListener(
      "pause",
      function () {
        // Change the button to be a play button
        changeButtonType(playPauseBtn, "play");
      },
      false
    );
  }

  function playPauseVideo() {
    if (player.paused || player.ended) {
      // Change the button to a pause button
      changeButtonType(playPauseBtn, "pause");
      player.play();
    } else {
      // Change the button to a play button
      changeButtonType(playPauseBtn, "play");
      player.pause();
    }
  }

  function changeButtonType(btn, value) {
    btn.title = value;
    btn.className = value;
  }
});
