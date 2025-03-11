const searchQuery = document.getElementById("searchInput");
const reset = document.getElementById("resetButton");
const submit = document.getElementById("submitButton");
const close = document.getElementById("closeButton");
const result = document.getElementById("resultDiv");
const dropDown = document.getElementById("dropDown");

const resetSearch = () => {
  searchQuery.value = "";
  dropDown.style.display = "none";
};
reset.addEventListener("click", resetSearch);

submit.addEventListener("click", () => {
  const query = searchQuery.value.toLowerCase().trim();

  fetch("travel_recommendation_api.json")
    .then((res) => res.json())
    .then((data) => {
      result.innerHTML = "";
      dropDown.style.display = "block";
      let hasResults = false;

      if (query === "countries") {
        data.countries.forEach((country) => {
          country.cities.forEach((city) => {
            showResult(city.name, city.imageUrl, city.description);
            hasResults = true;
          });
        });
      } else if (query === "beaches" || query === "beach") {
        data.beaches.forEach((beach) => {
          showResult(beach.name, beach.imageUrl, beach.description);
          hasResults = true;
        });
      } else if (query === "temples" || query === "temple") {
        data.temples.forEach((temple) => {
          showResult(temple.name, temple.imageUrl, temple.description);
          hasResults = true;
        });
      } else {
        data.countries.forEach((country) => {
          country.cities.forEach((city) => {
            if (city.name.toLowerCase().includes(query)) {
              showResult(city.name, city.imageUrl, city.description);
              hasResults = true;
            }
          });
        });

        data.temples.forEach((temple) => {
          if (temple.name.toLowerCase().includes(query)) {
            showResult(temple.name, temple.imageUrl, temple.description);
            hasResults = true;
          }
        });

        data.beaches.forEach((beach) => {
          if (beach.name.toLowerCase().includes(query)) {
            showResult(beach.name, beach.imageUrl, beach.description);
            hasResults = true;
          }
        });
      }
      if (!hasResults) {
        result.innerHTML = "<p>No Destinations Found.</p>";
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
});

const showResult = (name, imageUrl, description) => {
  const div = document.createElement("div");
  div.classList.add("result-item");
  close.style.display = "block";

  div.innerHTML = `
    <img src=${imageUrl} alt=${name}/>
    <h3>${name}</h3>
    <p>${description}</p>
    `;
  result.appendChild(div);
};

const closeDropDown = () => {
  close.style.display = "none";
  result.style.display = "none";
};

close.addEventListener("click", closeDropDown);

// searchError;

// currentTime;
