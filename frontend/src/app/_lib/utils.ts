
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

// Styles the appearance of the date in the appointment header
export function toAppointmentTime(startDate: Date, endDate: Date) {
  const date = startDate.getDate();
  const month = startDate.getMonth() + 1;
  const year = startDate.getFullYear();

  const startTime = `${startDate.getHours()}:${startDate.getMinutes().toString().padEnd(2, '0')}`;
  const endTime = `${endDate.getHours()}:${endDate.getMinutes().toString().padEnd(2, '0')}`;
  const interval = `${startTime} - ${endTime}`

  return `${month}/${date}/${year} | ${interval}`;
}

export function toDate(day: Date) {
  const date = day.getDate();
  const month = day.getMonth() + 1;
  const year = day.getFullYear();

  return `${month}/${date}/${year}`;
}
