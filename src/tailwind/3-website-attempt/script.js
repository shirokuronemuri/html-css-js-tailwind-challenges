import gsap from "gsap";

const container = document.getElementById("bg-container");
const bg = document.querySelector(".bg");

container.addEventListener("mousemove", (e) => {
  parallaxIt(e, ".bg", -150);
  parallaxIt(e, ".shiro-img", -30);
});

container.addEventListener("click", () => {
  const randomHue = Math.floor(Math.random() * 360);
  if (bg) {
    document.documentElement.style.setProperty("--grid-color", `oklch(50% 50% ${randomHue} / 0.4)`);
  }
});

function parallaxIt(e, target, movement) {
  var relX = e.pageX - container.offsetLeft;
  var relY = e.pageY - container.offsetTop;

  const moveX = ((relX - container.offsetWidth / 2) / container.offsetWidth) * movement;
  const moveY = ((relY - container.offsetHeight / 2) / container.offsetHeight) * movement;

  gsap.to(target, {
    x: moveX,
    y: moveY,
    duration: 1,
    ease: "power2.out",
  });
}
