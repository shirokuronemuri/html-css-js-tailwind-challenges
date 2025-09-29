const streetSelect = document.getElementById("choose-street");
const bedroomSelect = document.getElementById("choose-bedrooms");
const bathroomSelect = document.getElementById("choose-bathrooms");
const form = document.querySelector("form");

const resultCount = document.getElementById("result-count");
const output = document.getElementById("output");

let houses;

// Create fetchHouseData() function here
async function fetchHouseData() {
  const dataUrl = "https://mdn.github.io/shared-assets/misc/houses.json";
  const res = await fetch(dataUrl);
  houses = await res.json();
}

function initializeForm() {
  const streets = [...new Set(houses.map((house) => house.street))].sort();
  const bedrooms = [...new Set(houses.map((house) => house.bedrooms))].sort();
  const bathrooms = [...new Set(houses.map((house) => house.bathrooms))].sort();
  for (let street of streets) {
    const option = document.createElement("option");
    option.value = street;
    option.textContent = street;
    streetSelect.appendChild(option);
  }
  for (let bedroom of bedrooms) {
    const option = document.createElement("option");
    option.value = bedroom;
    option.textContent = bedroom;
    bedroomSelect.appendChild(option);
  }
  for (let bathroom of bathrooms) {
    const option = document.createElement("option");
    option.value = bathroom;
    option.textContent = bathroom;
    bathroomSelect.appendChild(option);
  }
}

function renderHouses(e) {
  e.preventDefault();

  const filteredHouses = houses.filter((house) => {
    const street = streetSelect.value;
    const bedrooms = bedroomSelect.value;
    const bathrooms = bathroomSelect.value;
    return (
      (street === "" || house.street === street) &&
      (bedrooms === "" || house.bedrooms === Number(bedrooms)) &&
      (bathrooms === "" || house.bathrooms === Number(bathrooms))
    );
  });
  resultCount.textContent = `Results returned: ${filteredHouses.length}`;
  output.innerHTML = "";
  const renderHouse = (house) => {
    const houseArea = Object.values(house.room_sizes).reduce((acc, cur) => acc + cur, 0);

    const article = document.createElement("article");
    const h2 = document.createElement("h2");
    h2.textContent = `${house.house_number} ${house.street}`;
    article.appendChild(h2);
    const list = document.createElement("ul");
    article.appendChild(list);
    const bedroomsitem = document.createElement("li");
    bedroomsitem.textContent = `🛏️ Bedrooms: ${house.bedrooms}`;
    const bathroomsitem = document.createElement("li");
    bathroomsitem.textContent = `🛀 Bathrooms: ${house.bathrooms}`;
    const areaitem = document.createElement("li");
    areaitem.textContent = `Room area: ${houseArea}m²`;
    const priceitem = document.createElement("li");
    priceitem.textContent = `Price: £${house.price}`;
    list.appendChild(bedroomsitem);
    list.appendChild(bathroomsitem);
    list.appendChild(areaitem);
    list.appendChild(priceitem);

    output.appendChild(article);
  };
  for (let house of filteredHouses) {
    renderHouse(house);
  }
}

form.addEventListener("submit", renderHouses);

await fetchHouseData();
initializeForm();
