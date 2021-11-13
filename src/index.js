import { debounce } from 'lodash';
import './css/styles.css';


const DEBOUNCE_DELAY = 300;

const refs = {
    searchBox : document.querySelector("#search-box"),
    countryList : document.querySelector(".country-list"),
    countryInfo : document.querySelector(".country-info"),
};

// console.log(refs.searchBox);
// console.log(refs.countryList);

// refs.searchBox.addEventListener('input', )

const fetchCountries = fetch('https://restcountries.com/v3.1/all').then(responce => {
    return responce.json();
}).then(country => {
    console.log(country);
})

console.log(fetchCountries);