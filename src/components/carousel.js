export const initCarousel = () => {
  $("#left-arrow").on({ click: previousSlide });
  $("#right-arrow").on({ click: nextSlide });
  $(".slide-image").on({ click: nextSlide });
  $(".slide-image").on({
    mouseenter: stopSlides,
    mouseleave: startSlides,
  });

  let interval = window.setInterval(rotateSlides, 3000);

  function stopSlides() {
    window.clearInterval(interval);
  }

  function startSlides() {
    interval = window.setInterval(rotateSlides, 3000);
  }
  function rotateSlides() {
    // animation will go here
    let $firstSlide = $("#carousel").find("div:first");
    let width = $firstSlide.width();

    $firstSlide.animate({ marginLeft: -width }, 1000, function () {
      // What to do after the animation
      let $lastSlide = $("#carousel").find("div:last");
      $lastSlide.after($firstSlide);
      $firstSlide.css({ marginLeft: 0 });
    });
  }

  function nextSlide() {
    window.clearInterval(interval);
    let $currentSlide = $("#carousel").find("div:first");
    let width = $currentSlide.width();
    $currentSlide.animate({ marginLeft: -width }, 1000, function () {
      let $lastSlide = $("#carousel").find("div:last");
      $lastSlide.after($currentSlide);
      $currentSlide.css({ marginLeft: 0 });
      interval = window.setInterval(rotateSlides, 3000);
    });
  }

  function previousSlide() {
    window.clearInterval(interval);
    let $currentSlide = $("#carousel").find("div:first");
    let width = $currentSlide.width();
    let $previousSlide = $("#carousel").find("div:last");
    $previousSlide.css({ marginLeft: -width });
    $currentSlide.before($previousSlide);
    $previousSlide.animate({ marginLeft: 0 }, 1000, function () {
      interval = window.setInterval(rotateSlides, 3000);
    });
  }
};
