function AnhqvClient({
  restClient,
}) {
  this.restClient = restClient;
}

/**
 * API Resources
 */

const CHARACTERS = 'characters';
const CHAPTERS = 'chapters';

AnhqvClient.prototype.setBaseURL = function setBaseURL(baseURL) {
  this.restClient.defaults.baseURL = baseURL;
};

/**
 * Método que sirve para obtener el listado de personajes.
 *
 * @author jualoppaz
 */
AnhqvClient.prototype.getCharacters = function getCharacters() {
  return this.restClient.get(`/${CHARACTERS}`)
    .then((response) => response.data);
};

/**
 * Método que sirve para obtener el detalle de un personaje dado su slug.
 *
 * @author jualoppaz
 */
AnhqvClient.prototype.getCharacterBySlug = function getCharacterBySlug(slug) {
  return this.restClient.get(`/${CHARACTERS}/${slug}`)
    .then((response) => response.data);
};

/**
 * Método que sirve para obtener el listado de capítulos que cumplan
 * con los criterios proporcionados.
 *
 * @author jualoppaz
 */
AnhqvClient.prototype.getChapters = function getChapters(params) {
  return this.restClient.get(`/${CHAPTERS}`, { params })
    .then((response) => response.data);
};

/**
 * Método que sirve para obtener el detalle de un capítulo dado su slug.
 *
 * @author jualoppaz
 */
AnhqvClient.prototype.getChapterBySlug = function getChapterBySlug(slug) {
  return this.restClient.get(`/${CHAPTERS}/${slug}`)
    .then((response) => response.data);
};

module.exports = (deps) => AnhqvClient.bind(null, deps);
