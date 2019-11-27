const UrlEncodedCode = window.location.pathname.replace("/layout/", "");
console.log(UrlEncodedCode);

// Checks

if (UrlEncodedCode.length != 5 && UrlEncodedCode.length > 0) {
  console.log("Invalid code format");
} else if (UrlEncodedCode == 0) {
  console.log("No code provided");
}
