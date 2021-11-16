import { debounce } from 'lodash';
import './css/styles.css';


const DEBOUNCE_DELAY = 300;

const refs = {
    searchBox : document.querySelector("#search-box"),
    countryList : document.querySelector(".country-list"),
    countryInfo : document.querySelector(".country-info"),
};

refs.searchBox.addEventListener('input', debounce((handleCountryInput),DEBOUNCE_DELAY))

function handleCountryInput(evt) {
    const countryName = evt.target.value;
fetchCountries(countryName)
        .then(countries => renderCountry (countries) )
        .catch(error => console.log(error))
    
    };

function fetchCountries (countryName) {
  return  fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`)
    .then( (response) => {
        if(!response.ok){
            throw new Error(response.statusText);
        }
    return response.json();
    })
}
function renderCountry(countries) {
 return countries.map(({name,flags}) => {
     return `<li class="gallery__item">

 <img class="country-img" src="${flags.svg}"
   alt=""
 /> <h2>${name.official}</h2>


</li>`;}).join('')


} 
console.log();


  
   
    

  


















