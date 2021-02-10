import 'core-js/stable';
import 'regenerator-runtime/runtime';

'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const imgContainer = document.querySelector('.images');
const secBtn = document.querySelector('.second_button');

/////Function to add data into the HTML//////
const myFun = function(data)
{
  const myCon = `<article class="country">
  <img class="country__img" src="${data.flag}"/>
  <div id="box1" class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(1)} M</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    <button class="second_button">Click for more info</p>
  </div>
</article>`;

countriesContainer.insertAdjacentHTML('beforeend',myCon);
countriesContainer.style.opacity = 1;
};

/////Function to add data into the second HTML//////
   const myFun1 = function(data,temp,className='second_button')
      {
        const myCon1 = `<article class="country1 ${className}">
        
        <div class="country1__data no-show">
        <h3 class="country1__name">Your Other Details:</h3>
          <p class="country1__row"><span>City:</span>${data.city}</p>
          <p class="country1__row"><span>State: </span>${data.state}</p>
          <p class="country1__row"><span>Area: </span>${data.staddress}</p>
          <p class="country1__row"><span>Locality: </span>${data.poi.name}</p>
          <p class="country1__row"><span>District: </span>${data.osmtags.wikipedia}</p>
          <p class="country1__row"><span>Pincode: </span>${data.postal}</p>
          <p class="country1__row"><span>Temperature: </span>${temp}℃</p>
        </div>
      </article>`;
      
      countriesContainer.insertAdjacentHTML('beforeend',myCon1);
      countriesContainer.style.opacity = 1;
      
      }; 

/////Function to show error message//////
  const showError = function(msg){
  countriesContainer.insertAdjacentHTML('beforeend',msg);
  countriesContainer.style.opacity = 1;
};


////////////Start of the code to fetch country data based on current location using async await/////////////
  
	const promApi = function(){                 //Promisifying an API
    return new Promise(function(resolve,reject){
      navigator.geolocation.getCurrentPosition(position => resolve(position),(error => reject(error)));
    });
    };
    // promApi().then((pos)=>console.log(pos))
    
    const AsynApi = async function(){    
         //  $('.btn-country').addClass('no-show');
      $('.btn-country').hide();
      try{ 
        const pos = await promApi();          //consuming a promise using async await//
        const {latitude:lat,longitude:lng} = pos.coords;
        const count1 = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
        if(!count1.ok) throw new Error('Please refresh the page again');
        const res1 = await count1.json();
        // console.log(`Currently you are in: ${res1.city}, ${res1.state}, ${res1.country}`); 
        // console.log(res1);
        
        const count2 = await fetch(`https://restcountries.eu/rest/v2/name/${res1.country}`);
        if(!count1.ok) throw new Error('Please refresh the page again');
        const res2 = await count2.json();
        // console.log(res2[1])
        myFun(res2[1]);
        
        const count3 = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
        if(!count3.ok) throw new Error('cannot fetch details, Please refresh the page again');
        const res3= await count3.json();
        // console.log(`Currently you are in: ${res3.city}, ${res3.state}, ${res3.country}`); 
        // console.log(res3);
        // myFun1(res3);
        
     
        const count4 = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=24e8ca33d9d432f21f8d01dcfbf6e7fe`);
              //  if(!count4.ok) throw new Error('country not found');
               const res4= await count4.json();
              //  console.log(res4);
              const {feels_like} = res4.main;
              // console.log(feels_like);
              const temp = Math.round(feels_like-273);
              console.log(`Currently you are in: ${res3.city}, ${res3.state}, ${res3.country} and the current temp is: ${temp}℃`);
// console.log(temp);
         myFun1(res3,temp);         
        
      }
      catch(err){
        showError(`Something went wrong, ${err.message}`);
      }
    }
    btn.addEventListener('click',AsynApi);

    $(document).on('click','.second_button',() => {
      $('.country1__data').removeClass('no-show');
      });
   






    