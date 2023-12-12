function contentMessageHandler(length, type) {
  console.log(type);
  console.log(length);
  let msgSummaryType = "";
  let msgLength = ``;

  switch (length) {
    case "Short":
      msgLength = `The summary should be short, around 10% of the original article length provided by user.`;
      break;
    case "Medium":
      msgLength = `The summary should be medium length, around 30% of the length of the original article provided by user.`;
      break;
    case "Long":
      msgLength = `The summary should be long, spanning around 70% of the original article length provided by user.`;
      break;
  }
  switch (type) {
    case "Generic Summary":
      msgSummaryType =
        "Capture the main ideas and key points. Distill the essential information and present it in a clear and understandable manner.";
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

  return `${msgSummaryType} ${msgLength}`;
}

module.exports = contentMessageHandler;
