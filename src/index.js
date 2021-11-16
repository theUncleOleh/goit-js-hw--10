import { debounce } from 'lodash';
import Notiflix from 'notiflix';
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
        .then(countries => { 
            if(countries.length > 10){
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            } else if(countries.length >= 2 && countries.length <= 10){
                renderCountries (countries)
            } else{
                renderCountry(countries)
            }
        })
        .catch(error => Notiflix.Notify.failure("Oops, there is no country with that name"))
        .finally(() => {
            // refs.countryList.innerHTML = ""
        })
        
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
 const markup = countries.map((country) => {
     return `<li class="country-item">

 <div class="country-part"><img class="country-img" src="${country.flags.svg}" width= "50mpx"  alt="${country.name.official}"/> 
 <h2 class="country-name"><b>${country.name.official}</b></h2></div>
  <p><b>Capital</b> : ${country.capital}</p>
  <p><b>Population</b> : ${country.population}</p>
  <p><b>Languages</b> : ${Object.values(country.languages)}</p>
 </li>`;}).join('')

refs.countryList.innerHTML = markup;

} 

function renderCountries (countries) {
const fewCountries = countries.map((country) => {
    return `<li class="country-item">
    <div class="country-part"><img class="country-img" src="${country.flags.svg}" width= "50mpx"  alt="${country.name.official}"/> 
 <h2 class="country-name"><b>${country.name.official}</b></h2></div>
 </li>`
}).join('')
refs.countryList.innerHTML = fewCountries;
}
 



  
   
    

  


















