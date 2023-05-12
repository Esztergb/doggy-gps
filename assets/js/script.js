//Initialization: You must initialize the select element as shown below. In addition, you will need a separate call for any dynamically generated select elements your page generates.
// document.addEventListener("DOMContentLoaded", function () {
//   var elems = document.querySelectorAll("select");
//   var instances = M.FormSelect.init(elems, options);
// });

// Or with jQuery

$(document).ready(function () {
  $("select").formSelect();
});

//=================API INFO================================

//Pet Finder API key: QaOqLcHGMYNgd5ddmdUhthfFZekvbZPavh5KvIA7RrTJkIgte4
//Pet finder Secret: dEZHQIWOMk1oIJKVrgjqkbDgY7VNZJQx5wXIGSnf

//GET https: //api.petfinder.com/v2/{CATEGORY}/{ACTION}?{parameter_1}={value_1}&{parameter_2}={value_2}
//https://api.petfinder.com/v2/animals?type=dog&page=2

//Code Ninjas API key: C5lDHrdwlk1HHbRJNwSU5w==txzH0pzoH7aGus9J
//Sample Request URL: https://api.api-ninjas.com/v1/dogs?name=

//JavaScript code example with ajax:
var name = "golden retriever";
$.ajax({
  method: "GET",
  url: "https://api.api-ninjas.com/v1/dogs?name=" + name,
  headers: { "X-Api-Key": "C5lDHrdwlk1HHbRJNwSU5w==txzH0pzoH7aGus9J" },
  contentType: "application/json",
  success: function (result) {
    console.log(result);
  },
  error: function ajaxError(jqXHR) {
    console.error("Error: ", jqXHR.responseText);
  },
});


//=========================================================

var userInput = $("#searchInput");
var testButton = $("#testBtn");

testButton.on("click", function() {
  var dogName = userInput.val();
  $.ajax({
    method: "GET",
    url: "https://api.api-ninjas.com/v1/dogs?name=" + dogName,
    headers: { "X-Api-Key": "C5lDHrdwlk1HHbRJNwSU5w==txzH0pzoH7aGus9J" },
    contentType: "application/json",
    success: function (result) {
      console.log(result);
    },
    error: function ajaxError(jqXHR) {
      console.error("Error: ", jqXHR.responseText);
    },
  });
})