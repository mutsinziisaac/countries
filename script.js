// Fetch data from data.json
fetch('data.json')
  .then((response) => response.json())
  .then((data) => {
    // Process the data and create country cards
    const countriesContainer = document.querySelector('.countries');

    data.forEach((country) => {
      const countryCard = createCountryCard(country);
      countriesContainer.appendChild(countryCard);
    });
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


