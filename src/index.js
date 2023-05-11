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
});
