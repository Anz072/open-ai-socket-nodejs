function contentMessageHandler(length, type) {
  console.log(type);
  console.log(length);
  let msgSummaryType = "";
  let msgLength = ``;

  switch (length) {
    case "Short":
      msgLength = `Provide a summary key points of the relevant articles, approximately 10-15% of the original article length. Should Be full sentences. `;
      break;
    case "Medium":
      msgLength = `Provide a more detailed summary of the relevant articles, covering around 20-30% of the length of the original articles. Should Be full sentences. `;
      break;
    case "Long":
      msgLength = `Generate a comprehensive summary of the relevant articles, spanning approximately 50-70% of the original article length. Should Be full sentences. `;
      break;
  }
  switch (type) {
    case "Generic Summary":
      msgSummaryType =
        "Create a concise summary, capturing the main ideas and key points. Your summary should distill the essential information and present it in a clear and understandable manner.";
      break;
    case "Novelty":
      msgSummaryType =
        "Emphasize and showcase any novel or unique elements. Highlight distinctive ideas, concepts, or perspectives that set the text apart and contribute to its originality.";
      break;
    case "Factual":
      msgSummaryType =
        "Focus on conveying the factual details and information. Prioritize accuracy and clarity in summarizing the key facts, events, and data presented in the text.";
      break;
    case "Entity":
      msgSummaryType =
        "Give special attention to the entities mentioned. Identify and succinctly describe the key people, organizations, locations, or any other relevant entities present in the text.";
      break;
    case "Takeaways":
      msgSummaryType =
        "Create a summary of the key takeaways. Identify and articulate the main lessons, insights, or points of significance that readers should extract from the content.";
      break;
  }

  return `${msgLength}${msgSummaryType}`;
}

module.exports = contentMessageHandler;
