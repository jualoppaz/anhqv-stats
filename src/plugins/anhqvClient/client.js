function AnhqvClient({
  restClient,
}) {
  this.restClient = restClient;
}

/**
 * API Resources
 */

const CHARACTERS = 'characters';

AnhqvClient.prototype.setBaseURL = function setBaseURL(baseURL) {
  this.restClient.defaults.baseURL = baseURL;
};

AnhqvClient.prototype.getCharacters = function getCharacters() {
  return this.restClient.get(`/${CHARACTERS}`)
    .then((response) => response.data);
};

AnhqvClient.prototype.getCharacterBySlug = function getCharacterBySlug(slug) {
  return this.restClient.get(`/${CHARACTERS}/${slug}`)
    .then((response) => response.data);
};

module.exports = (deps) => AnhqvClient.bind(null, deps);
