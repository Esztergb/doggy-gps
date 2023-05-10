//Initialization: You must initialize the select element as shown below. In addition, you will need a separate call for any dynamically generated select elements your page generates.
document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll("select");
  var instances = M.FormSelect.init(elems, options);
});

// Or with jQuery

$(document).ready(function () {
  $("select").formSelect();
});
        