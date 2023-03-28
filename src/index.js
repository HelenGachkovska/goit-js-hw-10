import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countriInfo = document.querySelector('.country-info');

let nameCountry = '';

inputEl.addEventListener('input', hendlerInputCountry);

function hendlerInputCountry(ev) {
  nameCountry = ev.target.value;
  console.log(nameCountry);
  fetchCountries(nameCountry);
}

function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => response.json())
    .then(data => {
      console.log(data.length);
      verifyResponse(data);
      return data;
    });
}

function verifyResponse(data) {
  if (data.length > 10) {
    // alert('забагато хочеш');
    // return;
  }
  if (data.length === 1) {
    console.log('одна-єдина');
    createListCountry(data);
    return;
  } else {
    console.log('список країн');
  }
}

function createListCountry(data) {
    console.log(data);
    const [
        {
            name: { official },
            capital,
            population,
            flags: { svg, alt },
            languages,
    },
    ] = data;
    console.log(...languages);

  countriInfo.innerHTML = `<img src=${svg} alt=${alt} width="50" height="50">
<h1>${official}</h1>
<p>Capital: ${capital}</p>
<p>Population: ${population}</p>
<p>Languages: ${languages}</p>`;
}
