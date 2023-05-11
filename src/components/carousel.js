export const initCarousel = ({
  containerId = "#carousel",
  observable = true,
  timeout = 3000,
  animationDuration = 1000,
}) => {
  $(`#left-arrow-${containerId.slice(1)}`).on({ click: previousSlide });
  $(`#right-arrow-${containerId.slice(1)}`).on({ click: nextSlide });
  $(`${containerId} .slide-image`).on({ click: nextSlide });

  let interval = window.setInterval(rotateSlides, timeout);

  let options = {
    threshold: [0.5],
    root: $(`${containerId}`)[0],
    rootMargin: "10px",
  };

  function onEntry(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setSlideNumber(entry.target.dataset.js);
      }
    });
  }

  let observer = new IntersectionObserver(onEntry, options);

  const elements = Array.from($(`${containerId} .slide-image`));

  if (observable) {
    for (let elm of elements) {
      observer.observe(elm);
    }
  }

  function rotateSlides() {
    // animation will go here
    let firstSlide = $(containerId).find("div:first");
    let width = firstSlide.width();

    firstSlide.animate({ marginLeft: -width }, animationDuration, function () {
      // What to do after the animation
      let lastSlide = $(containerId).find("div:last");
      lastSlide.after(firstSlide);
      firstSlide.css({ marginLeft: 0 });
    });
  }

  function nextSlide() {
    window.clearInterval(interval);
    let currentSlide = $(containerId).find("div:first");
    let width = currentSlide.width();
    currentSlide.animate(
      { marginLeft: -width },
      animationDuration,
      function () {
        let lastSlide = $(containerId).find("div:last");
        lastSlide.after(currentSlide);
        currentSlide.css({ marginLeft: 0 });
        interval = window.setInterval(rotateSlides, timeout);
      }
    );
  }

  function previousSlide() {
    window.clearInterval(interval);
    let currentSlide = $(containerId).find("div:first");
    let width = currentSlide.width();
    let previousSlide = $(containerId).find("div:last");
    previousSlide.css({ marginLeft: -width });
    currentSlide.before(previousSlide);
    previousSlide.animate({ marginLeft: 0 }, animationDuration, function () {
      interval = window.setInterval(rotateSlides, timeout);
    });
  }

  function setSlideNumber(number) {
    $("#slide-number").html(`${number} `);
  }
};
