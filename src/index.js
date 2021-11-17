import { debounce } from 'lodash';
import Notiflix from 'notiflix';
import './css/styles.css';
import getRefs from './getRefs';
import {fetchCountries }  from './fetchCountries';





const DEBOUNCE_DELAY = 300;
const refs = getRefs();



refs.searchBox.addEventListener('input', debounce((handleCountryInput),DEBOUNCE_DELAY))

function handleCountryInput(evt) {
    const countryName = evt.target.value;
   let formattedCountryName = countryName.trim();
   if(!formattedCountryName){
    refs.countryList.innerHTML = "";
    } {
        fetchCountries(formattedCountryName)
        .then(countries => { 
            if(countries.length > 10){
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            } else if(countries.length >= 2 && countries.length <= 10){
                renderCountries  (countries)
            } else{
                    renderCountry(countries) 
                }

               
        })
        .catch(error => Notiflix.Notify.failure("Oops, there is no country with that name"))
       
    };
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





  
   
    

  


















