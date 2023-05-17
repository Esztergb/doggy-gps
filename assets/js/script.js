//Initialization: You must initialize the select element as shown below. In addition, you will need a separate call for any dynamically generated select elements your page generates.
// document.addEventListener("DOMContentLoaded", function () {
//   var elems = document.querySelectorAll("select");
//   var instances = M.FormSelect.init(elems, options);
// });

// Or with jQuery

$(document).ready(function () {
  $("select").formSelect();
});


//================first API - Ninja API Call=========================================
//Code Ninjas API key: C5lDHrdwlk1HHbRJNwSU5w==txzH0pzoH7aGus9J
//Sample Request URL: https://api.api-ninjas.com/v1/dogs?name=

var userInput = $("#searchInput");
var testButton = $("#testBtn");
var userInputDos = $("#adoptionInput") 

// var createEl = $("#appendImg").append("<image src='./assets/images/placeholder.jpg' id='dogImg' class='dog-image'></image>");

//search dog button
testButton.on("click", function () {
  var dogName = userInput.val();

//ninja-api
  $.ajax({
    method: "GET",
    url: "https://api.api-ninjas.com/v1/dogs?name=" + dogName,
    headers: { "X-Api-Key": "C5lDHrdwlk1HHbRJNwSU5w==txzH0pzoH7aGus9J" },
    contentType: "application/json",
    success: function (result) {
      console.log(result);
      //print searched dog name on page
      var dogBreedName = document.querySelector("h3");
      dogBreedName.textContent = result[0].name;
      dogBreedName.setAttribute("name", dogBreedName);

      //print searched dog image from api on page
      var dogImage = document.querySelector("#dogImg");
      dogImgLink = result[0].image_link;

      // var createEl = $("#appendImg").append(`<image src=${dogImage} id='dogImg' class='dog-image'></image>`);
      dogImage.setAttribute("src", dogImgLink);

      //print searched dog attribute
      console.log('image', result[0].image_link);
        var attOne = document.getElementById("att1");
        var attTwo = document.getElementById("att2");
        var attThree = document.getElementById("att3");
        var attFour = document.getElementById("att4");
        attOne.textContent = result[0].barking;
        attTwo.textContent = result[0].energy;
        attThree.textContent = result[0].shedding;
        attFour.textContent = result[0].trainability;

        //store dog name for 2nd api
        localStorage.setItem("Dog name", dogName);

        //test storage
        var api2Search = document.querySelector("#adoptionInput");
        api2Search.value = localStorage.getItem("Dog name");
        localStorage.getItem
    },
    error: function ajaxError(jqXHR) {
      console.error("Error: ", jqXHR.responseText);
    },
  });
})
// console.log("ls Dog name: ",localStorage.getItem("Dog name"))
// var api2Search = document.querySelector("#test");
// api2Search.textContent = localStorage.getItem("Dog name");
//==================Second API - Petfinder API Call=====================
//GET https: //api.petfinder.com/v2/{CATEGORY}/{ACTION}?{parameter_1}={value_1}&{parameter_2}={value_2}
//https://api.petfinder.com/v2/animals?type=dog&page=2

//api.petfinder.com/v2/types/{type}/breeds
//GET https://api.petfinder.com/v2/{CATEGORY}/{ACTION}?{parameter_1}={value_1}&{parameter_2}={value_2}


//Getting the Oauth token with Petfinder API
//global variable
var petFinderKey = 'QaOqLcHGMYNgd5ddmdUhthfFZekvbZPavh5KvIA7RrTJkIgte4';
var petFinderSecret = 'dEZHQIWOMk1oIJKVrgjqkbDgY7VNZJQx5wXIGSnf';
var type = "dog";
var availability = "adoptable";
var token, tokenType, expires;
var btn = document.querySelector("#petfinderbtn");

//Call the API = this is a POST request, because we need the API to generate a new token

var getOAuth = function () {
  return fetch("https://api.petfinder.com/v2/oauth2/token", {
    method: "POST",
    body:
      "grant_type=client_credentials&client_id=" + petFinderKey + "&client_secret=" + petFinderSecret,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then(function (resp) {
    //return the response as JSON
    return resp.json();

  }).then(function (data) {
    //log the API data
    console.log('token', data);

    //store token data
    token = data.access_token;
    tokenType = data.token_type;
    expires = new Date().getTime() + (data.expires_in * 1000);

  }).catch(function (err) {
    //log any errors
    console.log('something went wrong', err);
  });
};


//Second API call = get OAuth credentials

var getPets = function () {
  return fetch("https://api.petfinder.com/v2/animals?type=" + type + "&status=" + availability, {
    headers: {
      Authorization: tokenType + " " + token,
      "Content-Type": "application/x-www-form-urlencoded",
    }

  }).then(function (resp) {
    // Return the API response as JSON
    return resp.json();

  }).then(function (data) {
    // Log the pet data

    console.log('ap2 pets', data);

  }).catch(function (err) {
    //log any errors
    console.log('something went wrong', err);
  });
};

//check to see if our token has expired = check to see if expires has a value, If it does, we’ll subtract the current Unix timesteamp (new Date().getTime()) from it. If the resulting number is less than 1, the token has expired.
var makeCall = function () {
  //if current token in invalid, get a new one
  if (!expires || expires - new Date().getTime() < 1) {
    console.log('new call');
    getOAuth().then(function () {
      getPets();
    });
    return;
  }
  //otherwise get pets
  // console.log('from cache');
  getPets
};

makeCall();
btn.addEventListener('click', function() {
  makeCall(), false;
  var dogBreedDos = userInputDos.val();
    return fetch("https://api.petfinder.com/v2/animals?type=" + type + "&breed=" + dogBreedDos + "&location=ca" + "&status=" + availability + "&limit=50", {
      headers: {
        Authorization: tokenType + " " + token,
        "Content-Type": "application/x-www-form-urlencoded",
      }
  
    }).then(function (resp) {
      // Return the API response as JSON
      return resp.json();
  
    }).then(function (data) {
      // Log the pet data
  
      console.log('api2 pets', data);
  
    }).catch(function (err) {
      //log any errors
      console.log('something went wrong', err);
    });
  
  });






 
