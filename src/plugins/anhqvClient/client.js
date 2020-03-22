function AnhqvClient({
  restClient,
}) {
  this.restClient = restClient;
}

/**
 * API Resources
 */

const CHARACTERS = 'characters';

AnhqvClient.prototype.setBaseURL = (baseURL) => {
  this.restClient.defaults.baseURL = baseURL;
};

AnhqvClient.prototype.getCharacters = function getCharacters() {
  return this.restClient.get(`/${CHARACTERS}`)
    .then((response) => response.data);
};

module.exports = (deps) => AnhqvClient.bind(null, deps);
