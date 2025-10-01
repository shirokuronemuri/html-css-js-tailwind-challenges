import { queryElement } from "../../helpers";

const displayedImage = queryElement<HTMLImageElement>(".displayed-img");
const thumbBar = queryElement<HTMLElement>(".thumb-bar");

const btn = queryElement<HTMLButtonElement>("button");
const overlay = queryElement<HTMLElement>(".overlay");

const images = import.meta.glob("./images/*.jpg", { eager: true }) as Record<
  string,
  { default: string }
>;
const imageUrls = Object.values(images).map((url) => url.default);
const alts = ["Eye", "White pattern", "Flowers", "Egyptian picture", "Butterfly"];
for (const [i, img] of imageUrls.entries()) {
  const newImage = document.createElement("img");
  newImage.setAttribute("src", img);
  newImage.setAttribute("alt", alts[i] || "");
  thumbBar.appendChild(newImage);

  newImage.addEventListener("click", (e) => {
    const target = (e.target as HTMLImageElement) || null;
    if (target) {
      displayedImage.setAttribute("src", target.getAttribute("src") || "");
      displayedImage.setAttribute("alt", target.getAttribute("alt") || "");
    }
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
