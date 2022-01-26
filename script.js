'use strict'

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = " ") {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};


const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  countriesContainer.style.opacity = 1;
};

///////////////////////////////////////////////////////////////
/**
  const getCountryData = function(country) {

  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v2/name/${country}`);

  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);

    console.log(data);

    const html = `
<article class="country">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
).toFixed(1)}</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
</article>
`;

    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('Portugal');
 */


//  Old way with callback inside
// 




// const request = fetch(`https://restcountries.com/v2/name/portugal`);
// console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`).then (function(
//     response) {
//     console.log(response);
//     return response.json();

//   }).then (function (data){
//     console.log(data);
//     renderCountry(data[0])
//   });
// };

//Same with arrow - look above for details

/** 

const getCountryData = function (country){
  // Country 1
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => {
      // response.json();
      console.log(response)

      if (!response.ok)
        throw new Error(`Country not found (${response.status})`)

        return response.json();
    })

    .then((data) => {
      renderCountry(data[0]);
      console.log(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      //country 2
      return fetch(
        `https://restcountries.com/v2/alpha/${neighbour}` // is what goes in return below
      );
    })
    .then((response) => response.json())
    .then((data) => renderCountry(data, "neighbour"))
    .catch((err) => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};


btn.addEventListener('click', function(){
  getCountryData('portugal');

});

 getCountryData('gdydud')
*/


//shorter way of writting above error with Helper function.



const getJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};




const getCountryData = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, "Country not found")
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) throw new Error("No neighbour found!"), console.log('baaaad');

      // Country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        "Country not found"
      );
    })

    .then((data) => renderCountry(data, "neighbour"))

    .catch((err) => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('ghana');
});



////////////////////////////////////Challenge #1/////////////////////////////////////////////
/**
In this challenge you will build a function 'whereAmI' which renders a country only based on GPS coordinates. For that, you will use a second API to geocode coordinates. So in this challenge, you’ll use an API on your own for the first time 😁
Your tasks:
PART 1
1. Create a function ' whereAmI' which takes as inputs a latitudevalue('lat') and a longitude value ('lng') (these are GPS coordinates, examples are in test data below).
2. Do“reverse geocoding ”of the provided coordinates.Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do not use the 'getJSON' function we created, that is cheating 😉
3. Once you have the data,take a look at it in the console to see all the attributes that you received about the provided location. Then, using this data, log a message like this to the console: “You are in Berlin, Germany”
4. Chain a.catch method to the end of the promise chain and logerrorstothe console
5. ThisAPIallowsyoutomakeonly3requestspersecond.Ifyoureloadfast,you will get this error with code 403. This is an error with the request. Remember, fetch() does not reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message
PART 2
6. Nowit'stimetousethereceiveddatatorenderacountry.Sotaketherelevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Renderthecountryandcatchanyerrors,justlikewehavedoneinthelast lecture (you can even copy this code, no need to type the same code)
      The Complete JavaScript Course 30
Test data:
§ Coordinates 1: 52.508, 13.381 (Latitude, Longitude) § Coordinates 2: 19.037, 72.873
§ Coordinates 3: -33.933, 18.474
GOOD LUCK 😀

 */

const whereAmI = function (lat, lng){ 
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then((res) => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })

    .then((data) => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })

    .then(response => {
      if(!response.ok)
      throw new Error(`Country not found(${response.status})`);
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch((err) => console.error(`${err.message} 💥`));
  };
whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);

