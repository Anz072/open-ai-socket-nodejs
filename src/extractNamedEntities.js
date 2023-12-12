const nlp = require("compromise");

function extractNamedEntities(text) {
  const doc = nlp(text);

  // Extract named entities for people, places, and organizations
  const people = doc.people().out("array");
  const places = doc.places().out("array");
  const organizations = doc.organizations().out("array");

  // Combine all named entities
  const namedEntities = [...people, ...places, ...organizations];

  return namedEntities;
}

module.exports = extractNamedEntities;
