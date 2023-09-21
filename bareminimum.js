let customEase =
  "M0,0,C0,0,0.13,0.34,0.238,0.442,0.305,0.506,0.322,0.514,0.396,0.54,0.478,0.568,0.468,0.56,0.522,0.584,0.572,0.606,0.61,0.719,0.714,0.826,0.798,0.912,1,1,1,1";
let counter = {
  value: 0
};
let loaderDuration = 10;

// If not a first time visit in this tab
if (sessionStorage.getItem("visited") !== null) {
  loaderDuration = 2;
  counter = {
    value: 75
  };
}
sessionStorage.setItem("visited", "true");

function updateLoaderText() {
  let progress = Math.round(counter.value);
  $(".loader_number").text(progress);
}
function endLoaderAnimation() {
  $(".loader_trigger").click();
}

let tl33 = gsap.timeline({
  onComplete: endLoaderAnimation
});
tl33.to(counter, {
  value: 100,
  onUpdate: updateLoaderText,
  duration: loaderDuration,
  ease: CustomEase.create("custom", customEase)
});
tl33.to(
  ".loader_progress",
  {
    width: "100%",
    duration: loaderDuration,
    ease: CustomEase.create("custom", customEase)
  },
  0
);

// let bodyScrollDirection;
// ScrollTrigger.create({
//   trigger: ".inner-section",
//   start: "top top",
//   end: "bottom bottom",
//   onUpdate: (self) => {
//     if (bodyScrollDirection !== self.direction) {
//       bodyScrollDirection = self.direction;
//       if (self.direction === 1) {
//         $(".nav").addClass("is-hide");
//       } else {
//         $(".nav").removeClass("is-hide");
//       }
//     }
//   }
// });
// DESKTOP

$(".cursor_text-wrapper").css("opacity", "0%");

let tricksCursor = document.querySelector(".cursor_move");
window.addEventListener("mousemove", cursor);

function cursor(e) {
  tricksCursor.style.top = e.clientY + "px";
  tricksCursor.style.left = e.clientX + "px";
}

$("a").mouseenter(function () {
  window.removeEventListener("mousemove", cursor);
  var tricksWidth = $(this).outerWidth() / 2;
  var tricksHeight = $(this).outerHeight() / 2;
  //var tricksTop = $(this).offset().top;
  var tricksTop = $(this).offset().top - $(document).scrollTop();
  var tricksLeft = $(this).offset().left;
  tricksCursor.style.top = tricksTop + tricksHeight + "px";
  tricksCursor.style.left = tricksLeft + tricksWidth + "px";
});

$("a").mouseleave(function () {
  window.addEventListener("mousemove", cursor);
});

$("a").mouseleave(function () {
  $(".cursor_dot").removeClass("is-larger");
});

$(".logo_img-link").mouseenter(function () {
  $(".cursor_dot").addClass("is-larger");
});

$("a").mouseenter(function () {
  $(".cursor_dot").addClass("is-larger");
});

$(".section_hero.section-style-video").on("mouseenter", function () {
  let heroText = $(".section_hero.section-style-video").attr("data-text");
  $(".cursor_dot").addClass("is-larger");
  $(".cursor_text-wrapper").css("opacity", "100%");
  $(".cursor_text").text(heroText);
});

$(".section_hero.section-style-video").on("mouseleave", function () {
  $(".cursor_dot").removeClass("is-larger");
  $(".cursor_text-wrapper").css("opacity", "0%");
});

$(".swiper_main-wrapper").on("mouseenter", function () {
  let swipeText = $(".section_swiper").attr("data-text");
  $(".cursor_dot").addClass("is-larger");
  $(".cursor_text-wrapper").css("opacity", "100%");
  $(".cursor_text").text(swipeText);
});

$(".swiper_main-wrapper").on("mouseleave", function () {
  $(".cursor_dot").removeClass("is-larger");
  $(".cursor_text-wrapper").css("opacity", "0%");
});

$(".slider_main-component").each(function (index) {
  let loopMode = false;
  if ($(this).attr("loop-mode") === "true") {
    loopMode = true;
  }
  let sliderDuration = 300;
  if ($(this).attr("slider-duration") !== undefined) {
    sliderDuration = +$(this).attr("slider-duration");
  }
  const swiper = new Swiper($(this).find(".swiper")[0], {
    speed: sliderDuration,
    loop: loopMode,
    autoHeight: false,
    followFinger: true,
    freeMode: false,
    slideToClickedSlide: false,
    slidesPerView: 1,
    spaceBetween: "2%",
    rewind: false,
    mousewheel: {
      forceToAxis: true
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },
    breakpoints: {
      // mobile landscape
      480: {
        slidesPerView: 1,
        spaceBetween: "5%"
      },
      // tablet
      768: {
        slidesPerView: 2,
        spaceBetween: "5%"
      },
      // desktop
      992: {
        slidesPerView: 3,
        spaceBetween: "3%"
      }
    },
    slideActiveClass: "is-active",
    slideDuplicateActiveClass: "is-active"
  });
});

//SECION HERO
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  markers: false
});

$(".header_text-move").each(function (index) {
  let tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".section_marquee",
      start: "30% top",
      scrub: 0.8
    }
  });
  tl3.from($(this), {
    y: "100%",
    ease: "power2.inOut",
    duration: 0.5
  });
});

//SECTION TEXT ANIMATION
let typeSplit;

// Split the text up

runSplit();

// Update on window resize
let windowWidth = $(window).innerWidth();

window.addEventListener("resize", function () {
  if (windowWidth !== $(window).innerWidth()) {
    windowWidth = $(window).innerWidth();
    typeSplit.revert();
    runSplit();
  }
});

function runSplit() {
  typeSplit = new SplitType(".split-line", {
    types: "lines, words"
  });
  $(".line").append("<div class='line-mask'></div>");
  runMask();
}

function runMask() {
  $(".line").each(function (index, element) {
    let tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: "top 60%",
        end: "bottom 60%",
        scrub: 1
      }
    });

    tl1.to($(this).find(".line-mask"), {
      width: "0%",
      duration: 2
    });
  });
}

//SECTION MARQUEE

// MARQUEE POWER-UP
window.addEventListener("DOMContentLoaded", (event) => {
  // attribute value checker
  function attr(defaultVal, attrVal) {
    const defaultValType = typeof defaultVal;
    if (typeof attrVal !== "string" || attrVal.trim() === "") return defaultVal;
    if (attrVal === "true" && defaultValType === "boolean") return true;
    if (attrVal === "false" && defaultValType === "boolean") return false;
    if (isNaN(attrVal) && defaultValType === "string") return attrVal;
    if (!isNaN(attrVal) && defaultValType === "number") return +attrVal;
    return defaultVal;
  }
  // marquee component
  $("[tr-marquee-element='component']").each(function (index) {
    let componentEl = $(this),
      panelEl = componentEl.find("[tr-marquee-element='panel']"),
      triggerHoverEl = componentEl.find("[tr-marquee-element='triggerhover']"),
      triggerClickEl = componentEl.find("[tr-marquee-element='triggerclick']");
    let speedSetting = attr(100, componentEl.attr("tr-marquee-speed")),
      verticalSetting = attr(false, componentEl.attr("tr-marquee-vertical")),
      reverseSetting = attr(false, componentEl.attr("tr-marquee-reverse")),
      scrollDirectionSetting = attr(
        false,
        componentEl.attr("tr-marquee-scrolldirection")
      ),
      scrollScrubSetting = attr(
        false,
        componentEl.attr("tr-marquee-scrollscrub")
      ),
      moveDistanceSetting = -100,
      timeScaleSetting = 1,
      pausedStateSetting = false;
    if (reverseSetting) moveDistanceSetting = 100;
    let marqueeTimeline = gsap.timeline({
      repeat: -1,
      onReverseComplete: () => marqueeTimeline.progress(1)
    });
    if (verticalSetting) {
      speedSetting = panelEl.first().height() / speedSetting;
      marqueeTimeline.fromTo(
        panelEl,
        { yPercent: 0 },
        { yPercent: moveDistanceSetting, ease: "none", duration: speedSetting }
      );
    } else {
      speedSetting = panelEl.first().width() / speedSetting;
      marqueeTimeline.fromTo(
        panelEl,
        { xPercent: 0 },
        { xPercent: moveDistanceSetting, ease: "none", duration: speedSetting }
      );
    }
    let scrubObject = { value: 1 };
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (!pausedStateSetting) {
          if (scrollDirectionSetting && timeScaleSetting !== self.direction) {
            timeScaleSetting = self.direction;
            marqueeTimeline.timeScale(self.direction);
          }
          if (scrollScrubSetting) {
            let v = self.getVelocity() * 0.006;
            v = gsap.utils.clamp(-60, 60, v);
            let scrubTimeline = gsap.timeline({
              onUpdate: () => marqueeTimeline.timeScale(scrubObject.value)
            });
            scrubTimeline.fromTo(
              scrubObject,
              { value: v },
              { value: timeScaleSetting, duration: 0.5 }
            );
          }
        }
      }
    });
    function pauseMarquee(isPausing) {
      pausedStateSetting = isPausing;
      let pauseObject = { value: 1 };
      let pauseTimeline = gsap.timeline({
        onUpdate: () => marqueeTimeline.timeScale(pauseObject.value)
      });
      if (isPausing) {
        pauseTimeline.fromTo(
          pauseObject,
          { value: timeScaleSetting },
          { value: 0, duration: 0.5 }
        );
        triggerClickEl.addClass("is-paused");
      } else {
        pauseTimeline.fromTo(
          pauseObject,
          { value: 0 },
          { value: timeScaleSetting, duration: 0.5 }
        );
        triggerClickEl.removeClass("is-paused");
      }
    }
    if (window.matchMedia("(pointer: fine)").matches) {
      triggerHoverEl.on("mouseenter", () => pauseMarquee(true));
      triggerHoverEl.on("mouseleave", () => pauseMarquee(false));
    }
    triggerClickEl.on("click", function () {
      !$(this).hasClass("is-paused") ? pauseMarquee(true) : pauseMarquee(false);
    });
  });
});

gsap.matchMedia().add("(max-width: 991px)", () => {
  $(".menu_icon-wrapper").each(function (index) {
    let tl14 = gsap.timeline({ paused: true });

    tl14.fromTo(
      ".nav_background",
      { y: "-100%" },
      {
        y: "0%",
        ease: "power2.out",
        duration: 0.5
      }
    );

    tl14.fromTo(
      ".nav_menu",
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        ease: "power2.out",
        stagger: {
          each: 0.2,
          from: "end"
        },
        duration: 0.5
      }
    );

    tl14.fromTo(
      ".about_information",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.5
      },
      0.5
    );

    $(this).on("click", function () {
      $(this).toggleClass("clicked");
      if ($(this).hasClass("clicked")) {
        tl14.play();
      } else {
        tl14.reverse();
      }
    });
  });
});

gsap.matchMedia().add("(min-width: 992px)", () => {
  let tl4 = gsap.timeline({
    scrollTrigger: {
      trigger: ".section_hero",
      start: "top top",
      end: "bottom top",
      scrub: 1
    }
  });

  tl4.from(".logo_img-link.is-nav", {
    y: "-90%",
    width: "100%",
    color: "white",
    duration: 0.5
  });
});

$(".section_content-scroll").each(function (index) {
  let itemContents = $(this).find(".grid_content-item");
  let itemImages = $(this).find(".grid_img-item");

  // Function to make an item active
  function makeItemActive(index) {
    // Remove "is-active" class from all items
    itemImages.removeClass("is-active");
    itemContents.removeClass("is-active");

    // Add "is-active" class to the selected index
    itemImages.eq(index).addClass("is-active");
    itemContents.eq(index).addClass("is-active");
  }

  makeItemActive(0);

  itemContents.each(function (index) {
    ScrollTrigger.create({
      trigger: $(this),
      start: "top center",
      end: "bottom center",
      onToggle: (isActive) => {
        if (isActive) {
          makeItemActive(index);
        }
      }
    });
  });
});

$(".home-scroll_trigger-item").each(function (index) {
  let cmsItem = $(".card_stack-item");
  let zIndex = 1;

  let tl6 = gsap.timeline({
    scrollTrigger: {
      trigger: $(this),
      start: "top bottom",
      end: "bottom bottom",
      scrub: 1
    }
  });

  tl6.from(cmsItem.eq(index), {
    yPercent: 150,
    duration: 3
  });

  tl6.from(
    $(".card_img").eq(index),
    {
      scale: 1.2,
      delay: 0.5,
      duration: 3
    },
    0
  );
});

function countUp(self) {
  $(".number").text(Math.round(self.progress * 75));
}

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-wrap",
    // trigger element - viewport
    start: "top top",
    end: "bottom bottom",
    ease: "none",
    scrub: 1,
    onUpdate: countUp
  }
});
tl.to(".land-image_photo", {
  width: "100%",
  left: "0%",
  duration: 1,
  ease: "none"
});
tl.to(".land-image_photo", {
  height: "50%",
  top: "50%",
  duration: 1
});
tl.to(".land-image_photo", {
  width: "60%",
  left: "0%",
  duration: 1,
  ease: "none"
});
tl.to(".land-image_photo", {
  height: "25%",
  duration: 1,
  ease: "none"
});
tl.to(".land-image_photo", {
  width: "30%",
  left: "30%",
  duration: 1,
  ease: "none"
});
tl.to(".land-image_photo", {
  height: "12.5%",
  top: "62.5%",
  duration: 1,
  ease: "none"
});
tl.to(".land-image_photo", {
  width: "15%",
  duration: 1,
  ease: "none"
});
tl.to(".land-image_photo", {
  height: "6.25%",
  top: "62.5%",
  duration: 1,
  ease: "none"
});
tl.to(".land-image_photo", {
  width: "7.5%",
  left: "37.5%",
  duration: 1,
  ease: "none"
});
tl.to(
  ".land-image_img",
  {
    left: "-50%",
    scale: 3,
    duration: 9,
    ease: "none"
  },
  0
);
tl.from(
  ".land_p-wrap",
  {
    opacity: 0,
    top: "2em",
    duration: 0.5,
    ease: "power2.out"
  },
  1
);

// Create a GSAP timeline
let tl11 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section_swiper",
    start: "-50% top",
    end: "20% bottom",
    scrub: 1
  }
});

// Define the animation inside the timeline
tl11.fromTo(
  ".color_section-change",
  {
    backgroundColor: "#f5f5f5",
    color: "#070707"
  },
  {
    backgroundColor: "#070707",
    color: "#f5f5f5",
    duration: 2
  }
);

tl11.from(
  ".slider_main-component",
  {
    opacity: 0,
    duration: 1
  },
  0
);
// Create another GSAP timeline
$(".card_marquee-wrapper").each(function (index) {
  let tl12 = gsap.timeline({
    scrollTrigger: {
      trigger: ".section_card-inspo",
      start: "top top",
      end: "20% bottom",
      scrub: 1
    }
  });

  // Define the animation inside the second timeline
  tl12.to(".color_section-change", {
    backgroundColor: "#f5f5f5",
    color: "#070707",
    duration: 1
  });

  tl12.to(
    $(this).find(".sticky_marquee-wrapper.is-top"),
    { color: "#f5f5f5" },
    0
  );
});

//

$("[hoverstagger='link']").each(function (index) {
  let text1 = $(this).find("[hoverstagger='text']").eq(0);
  let text2 = $(this).find("[hoverstagger='text']").eq(1);

  let tl16 = gsap.timeline({
    defaults: {
      duration: 1,
      repeat: -1,
      ease: "power2.out"
    }
  });

  tl16.fromTo(text1, { yPercent: 0 }, { yPercent: -100 });
  tl16.fromTo(text2, { yPercent: 100 }, { yPercent: 0 }, 0);
});

let tl15 = gsap.timeline({
  scrollTrigger: {
    trigger: ".color_section-change",
    start: "bottom bottom",
    end: "bottom center",
    ease: "power2.out",
    scrub: 0.8
  }
});

tl15.from($(".logo_img.is-footer"), {
  yPercent: -100,
  duration: 0.5
});
