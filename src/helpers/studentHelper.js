export const calculateAge = (birthday) => {
  // birthday is a date
  if (birthday) {
    var ageDifMs = Date.now() - new Date(birthday).getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getFullYear() - 1970);
  } else return null;
};
