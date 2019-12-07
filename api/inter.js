module.exports = (req, res) => {
  const { url = "World" } = req.query;
  res.status(200).send(`Hello ${url}!`);
};
