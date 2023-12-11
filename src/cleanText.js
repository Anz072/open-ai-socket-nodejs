const cheerio = require("cheerio");
const { removeStopwords } = require("stopword");
const natural = require("natural");
const nlp = require("compromise");
const sentenceSplitter = require("sentence-splitter");

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

function extractKeywords(sentences) {
  const tokenizer = new natural.WordTokenizer();
  const tfidf = new natural.TfIdf();

  // Add each sentence as a separate document to the TF-IDF model
  sentences.forEach((sentence) => {
    const words = tokenizer.tokenize(sentence);
    tfidf.addDocument(words);
  });

  // Extract keywords based on TF-IDF for each document
  const keywords = [];
  for (let i = 0; i < tfidf.documents.length; i++) {
    const documentKeywords = tfidf
      .listTerms(i)
      .filter((item) => item.term.length > 2) // Example: filter out short words
      .map((item) => item.term.toLowerCase()); // Example: convert to lowercase
    keywords.push(documentKeywords);
  }

  return keywords;
}

function cleanText(scrapedText) {
  const xda = scrapedText
    .split("\n")
    .filter((sentence) => sentence.trim() !== "");

  const filteredArray = xda.filter((sentence) => {
    const words = sentence.split(/\s+/);
    return words.length >= 3;
  });

  const modifiedArray = filteredArray.map((sentence) => {
    if (!/[.!?]$/.test(sentence)) {
      return sentence + ". ";
    }
    return sentence;
  });

  // Remove HTML tags
  const cleanedText = cheerio.load(modifiedArray.join(" ")).text();

  const sentences = sentenceSplitter
    .split(cleanedText)
    .filter((node) => node.type === "Sentence")
    .map((sentence) => sentence.raw.replace(/(\r\n|\n|\r)/gm, "").trim());

  // Remove stopwords
  const filteredSentences = sentences.map((sentence) => {
    const filteredText = removeStopwords(sentence.split(" "));
    return filteredText.join(" ");
  });

  // Score sentences based on length, keyword presence, and named entities
  const keywords = extractKeywords(sentences);

  const namedEntities = extractNamedEntities(cleanedText);
  const scoredSentences = filteredSentences.map((sentence) => {
    // Score based on length (adjust the thresholds as needed)
    const lengthScore = sentence.length < 20 ? 0.5 : 1.0;
    // Score based on keyword presence
    const keywordScore = keywords.some((keyword) =>
      sentence.toLowerCase().includes(keyword)
    )
      ? 1.0
      : 0.5;

    // Score based on named entities
    const namedEntityScore = namedEntities.some((entity) =>
      sentence.includes(entity)
    )
      ? 1.0
      : 0.5;

    // Combine scores (you may adjust weights based on importance)
    const totalScore =
      lengthScore * 0.4 + keywordScore * 0.3 + namedEntityScore * 0.3;
    return { sentence, score: totalScore };
  });

  // Filter sentences based on score (adjust the threshold as needed)
  const filteredResult = scoredSentences
    .filter((sentenceObj) => sentenceObj.score > 0.8)
    .map((sentenceObj) => sentenceObj.sentence);

  // Log the results (for testing purposes)
  // console.log("Original Sentences:", sentences.join(" ").split("").length);
  // console.log("Filtered Sentences:", filteredResult.join(" ").split("").length);
  return filteredResult.join(" ");
}


module.exports = cleanText;
