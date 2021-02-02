import 'core-js/stable';
import 'regenerator-runtime/runtime';

'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const imgContainer = document.querySelector('.images');

/////Function to add data into the HTML//////
const myFun = function(data,className = '')
{
  const myCon = `<article class="country ${className}">
  <img class="country__img" src="${data.flag}"/>
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(1)} M</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
</article>`;

countriesContainer.insertAdjacentHTML('beforeend',myCon);
countriesContainer.style.opacity = 1;
};

/////Function to show error message//////
  const showError = function(msg){
  countriesContainer.insertAdjacentHTML('beforeend',msg);
  countriesContainer.style.opacity = 1;
};


////////////Start of the code to fetch country data based on current location using async await/////////////
  
	const promApi = function(){      
    return new Promise(function(resolve,reject){
      navigator.geolocation.getCurrentPosition(position => resolve(position),(error => reject(error)));
    });
    };
    
    const AsynApi = async function(){    
     try{ 
    const pos = await promApi();          //consuming a promise using async await//
    const {latitude:lat,longitude:lng} = pos.coords;
    const count1 = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if(!count1.ok) throw new Error('country not found');
    const res1 = await count1.json();
    console.log(`Currently you are in: ${res1.city}, ${res1.state}, ${res1.country}`); 
    // console.log(res1);
    const count2 = await fetch(`https://restcountries.eu/rest/v2/name/${res1.country}`);
    if(!count1.ok) throw new Error('country not found');
    const res2 = await count2.json();
    // console.log(res2[1])
    myFun(res2[1]);
  }
  catch(err){
    showError(`Something went wrong, ${err.message}`);
  }
    }
    btn.addEventListener('click',AsynApi);