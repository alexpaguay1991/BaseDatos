export const currentAge = (date) => {
  const today = new Date();
  const birthDate = new Date(date);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export const formatDateTime = (date) => {
  const selectedDate = new Intl.DateTimeFormat("es").format(date);
  const parts = selectedDate.split('/');
  return `${parts[2]}-${parts[1]}-${parts[0]}`.replace(/\//g, "-");
}