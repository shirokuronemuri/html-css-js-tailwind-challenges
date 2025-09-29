const input = document.querySelector("input");
const addItem = document.querySelector("button");
const list = document.querySelector("ul");

addItem.addEventListener("click", () => {
  const item = document.createElement("li");
  const itemText = document.createElement("span");
  const deletebtn = document.createElement("button");
  deletebtn.textContent = "delete";
  itemText.textContent = input.value;
  item.appendChild(itemText);
  item.appendChild(deletebtn);
  list.appendChild(item);
  deletebtn.addEventListener("click", () => {
    list.removeChild(item);
  });
  input.value = "";
  input.focus();
});
