module.exports = (req, res) => {
  const { code = "Hello World" } = req.query;
  res.status(200).send(`Hello ${code}!`);
};
