const notFoundHandler = (request, response, next) => {
  const message = "Route Not Found";

  response.status(404).json({ message });
};

module.exports = {
  notFoundHandler,
};
