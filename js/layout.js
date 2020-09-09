const UrlEncodedCode = window.location.pathname.replace("/p/", "");
console.log(UrlEncodedCode);


function getProfilesFromCode(code) {
  $.get(`../api/inter?code=${code}`, (data) => {
      alert(data);
    });
}


// Checks
var alphaNumPatt = /^([0-9]|[a-z])+([0-9a-z]+)$/i;
if (UrlEncodedCode == "layout_process.html") {
  location.href = window.location.origin;
}

if (UrlEncodedCode.length != 5 && UrlEncodedCode.length > 0) {
  console.log("Invalid code format");
} else if (UrlEncodedCode == 0) {
  console.log("No code provided");
} else if (!UrlEncodedCode.match(alphaNumPatt)) {
  console.log("Code contains invalid characters");
} else {
  getProfilesFromCode(UrlEncodedCode);
}
