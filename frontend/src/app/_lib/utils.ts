
// Define utility functions here

// Takes a string as input and returns a string in Title Case, i.e. "lorem ipsum" -> "Lorem Ipsum"
export function toTitleCase(sentence: string) {
  if (!sentence) return "";

  const words = sentence.split(" ");

  for (let i = 0; i < words.length; i++) {
    if (words[i])
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  return words.join(" ");
}

export function toPhoneNumber(phone: string) {
  phone = phone.replace(/[^0-9]/g, '');
  phone = phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  return phone;
}
