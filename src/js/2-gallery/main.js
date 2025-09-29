const displayedImage = document.querySelector(".displayed-img");
const thumbBar = document.querySelector(".thumb-bar");

const btn = document.querySelector("button");
const overlay = document.querySelector(".overlay");

const images = Array(5)
  .fill("")
  .map((_, i) => `images/pic${i + 1}.jpg`);
const alts = ["Eye", "White pattern", "Flowers", "Egyptian picture", "Butterfly"];
for (let [i, img] of images.entries()) {
  const newImage = document.createElement("img");
  newImage.setAttribute("src", img);
  newImage.setAttribute("alt", alts[i]);
  thumbBar.appendChild(newImage);

  newImage.addEventListener("click", (e) => {
    displayedImage.setAttribute("src", e.target.getAttribute("src"));
    displayedImage.setAttribute("alt", e.target.getAttribute("alt"));
  });
}

btn.addEventListener("click", () => {
  if (btn.className === "dark") {
    btn.className = "light";
    btn.textContent = "Darken";
    overlay.style.backgroundColor = "rgb(0 0 0 / 0%)";
  } else if (btn.className === "light") {
    overlay.style.backgroundColor = "rgb(0 0 0 / 50%)";
    btn.className = "dark";
    btn.textContent = "Lighten";
  }
});
