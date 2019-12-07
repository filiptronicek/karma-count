module.exports = (req, res) => {
  const { code = "World" } = req.query;
  res.status(200).send(`Hello ${code}!`);
};
