let countriesData = []; // To store the fetched data

// Fetch data from data.json
fetch('data.json')
  .then((response) => response.json())
  .then((data) => {
    countriesData = data;
    updateCountryList(countriesData);
  })
  .catch((error) => console.error('Error fetching data:', error));

// Helper function to create a country card
function createCountryCard(countryData) {

  const countryCard = document.createElement('div');
  countryCard.classList.add('country-card');

  const flagImg = document.createElement('img');
  flagImg.src = countryData.flags.png;
  flagImg.alt = `Flag of ${countryData.name}`;
  countryCard.appendChild(flagImg);

  const countryName = document.createElement('h2');
  countryName.textContent = countryData.name;
  countryCard.appendChild(countryName);

  const countryInfo = document.createElement('p');
  countryInfo.textContent = `Capital: ${countryData.capital}\nPopulation: ${countryData.population}\nRegion: ${countryData.region}\nSubregion: ${countryData.subregion}`;
  countryCard.appendChild(countryInfo);

  return countryCard;
}


function updateCountryList(countries) {
  const countriesContainer = document.querySelector('.countries');
  countriesContainer.innerHTML = '';

  countries.forEach((country) => {
    const countryCard = createCountryCard(country);
    countriesContainer.appendChild(countryCard);
  });
}

// Function to filter countries based on the search input
function searchCountries(searchTerm) {
  const filteredCountries = countriesData.filter((country) => {
    const countryName = country.name.toLowerCase();
    return countryName.includes(searchTerm.toLowerCase());
  });

  updateCountryList(filteredCountries);
}

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (event) => {
  const searchTerm = event.target.value;
  searchCountries(searchTerm);
});

