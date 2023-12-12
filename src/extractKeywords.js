
const natural = require("natural");

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

  module.exports = extractKeywords;