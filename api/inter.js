const axios = require("axios");

function sendRequest(code) {
axios.get(`http://unidev.hys.cz/includes/get-api?user=${code}`).then(res => {
    let url = res.data;
    // send message to index.html
});
return url;

}

module.exports = (req, res) => {
  const { code = "World" } = req.query;
  res.status(200).send(sendRequest(code));
};
