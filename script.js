let countriesData = []; 

fetch('data.json')
  .then((response) => response.json())
  .then((data) => {
    countriesData = data;
    updateCountryList(countriesData);
  })
  .catch((error) => console.error('Error fetching data:', error));

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

  countryCard.addEventListener('click', () => showCountryDetails(countryData));

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

function showCountryDetails(countryData) {
  const countryDetailsModal = document.getElementById('countryModal');
  const countryDetailsContainer = document.getElementById('countryDetails');
  countryDetailsContainer.innerHTML = '';

  const countryName = document.createElement('h2');
  countryName.textContent = countryData.name;
  countryDetailsContainer.appendChild(countryName);

  const capital = document.createElement('p');
  capital.textContent = `Capital: ${countryData.capital}`;
  countryDetailsContainer.appendChild(capital);

  const population = document.createElement('p');
  population.textContent = `Population: ${countryData.population}`;
  countryDetailsContainer.appendChild(population);

  const countryCode = document.createElement('p');
  countryCode.textContent = `Country Code: ${countryData.alpha2Code}`;
  countryDetailsContainer.appendChild(countryCode);

  const currencies = document.createElement('p');
  const currencyList = countryData.currencies.map(currency => `${currency.name} (${currency.code})`).join(', ');
  currencies.textContent = `Currencies: ${currencyList}`;
  countryDetailsContainer.appendChild(currencies);

  // Show modal
  countryDetailsModal.style.display = 'block';
}

// Close modal
const closeModalButton = document.getElementById('closeModal');
closeModalButton.addEventListener('click', () => {
  const countryDetailsModal = document.getElementById('countryModal');
  countryDetailsModal.style.display = 'none';
});

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
