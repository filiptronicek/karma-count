const axios = require("axios");

function sendRequest(code) {
axios.get(`http://unidev.hys.cz/includes/get-api?user=${code}`).then(res => {
    let url = res.data;
    return url;
    // send message to index.html
});
}

module.exports = (req, res) => {
  const { code = "World" } = req.query;
  res.status(200).send(sendRequest(code));
};
