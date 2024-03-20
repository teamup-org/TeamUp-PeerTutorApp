// Define utility functions here

export function toTitleCase(sentence: string) {
  if (!sentence) return "";

  const words = sentence.split(" ");

  for (let i = 0; i < words.length; i++) {
    if (words[i])
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  return words.join(" ");
}
