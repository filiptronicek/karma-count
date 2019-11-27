const UrlEncodedCode = window.location.pathname.replace("/layout/", "");
console.log(UrlEncodedCode);

// Checks
var alphaNumPatt = /^([0-9]|[a-z])+([0-9a-z]+)$/i;

if (UrlEncodedCode.length != 5 && UrlEncodedCode.length > 0) {
  console.log("Invalid code format");
} else if (UrlEncodedCode == 0) {
  console.log("No code provided");
} else if (!UrlEncodedCode.match(Exp)) {
  console.log("Code contains invalid characters");
}
