export const initCarousel = (sliderID = "#carousel") => {
  $("#left-arrow").on({ click: previousSlide });
  $("#right-arrow").on({ click: nextSlide });
  $(`${sliderID} .slide-image`).on({ click: nextSlide });

  let interval = window.setInterval(rotateSlides, 3000);

  let options = {
    threshold: [0.5],
    root: $(`${sliderID}`)[0],
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

  const elements = Array.from($(`${sliderID} .slide-image`));

  for (let elm of elements) {
    observer.observe(elm);
  }

  function rotateSlides() {
    // animation will go here
    let firstSlide = $(sliderID).find("div:first");
    let width = firstSlide.width();

    // setSlideNumber(+firstSlide[0].dataset.js);

    firstSlide.animate({ marginLeft: -width }, 1000, function () {
      // What to do after the animation
      let lastSlide = $(sliderID).find("div:last");
      lastSlide.after(firstSlide);
      firstSlide.css({ marginLeft: 0 });
    });
  }

  function nextSlide() {
    window.clearInterval(interval);
    let currentSlide = $(sliderID).find("div:first");
    let width = currentSlide.width();
    currentSlide.animate({ marginLeft: -width }, 1000, function () {
      let lastSlide = $(sliderID).find("div:last");
      lastSlide.after(currentSlide);
      currentSlide.css({ marginLeft: 0 });
      interval = window.setInterval(rotateSlides, 3000);
    });
  }

  function previousSlide() {
    window.clearInterval(interval);
    let currentSlide = $(sliderID).find("div:first");
    let width = currentSlide.width();
    let previousSlide = $(sliderID).find("div:last");
    previousSlide.css({ marginLeft: -width });
    currentSlide.before(previousSlide);
    previousSlide.animate({ marginLeft: 0 }, 1000, function () {
      interval = window.setInterval(rotateSlides, 3000);
    });
  }

  function setSlideNumber(number) {
    $("#slide-number").html(`${number} `);
  }
};
