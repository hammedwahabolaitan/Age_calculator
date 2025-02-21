// script.js
function calculateAge() {
  const birthYear = document.getElementById("birthYear").value;
  const birthMonth = document.getElementById("birthMonth").value;
  const birthDay = document.getElementById("birthDay").value;

  const birthDate = new Date(birthYear, birthMonth - 1, birthDay); // Month is 0-indexed
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  let month = today.getMonth() - birthDate.getMonth();
  let day = today.getDate() - birthDate.getDate();


  if (month < 0 || (month === 0 && day < 0)) {
    age--;
    month = (12 + month) % 12; // Handle negative months
    if (day < 0) {
        let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        day = lastDayOfMonth + day;
        month--; //account for month change
        if(month < 0){
            month = 11;
        }
    }
  }

  const resultDiv = document.getElementById("result");
  resultDiv.textContent = `Your age is ${age} years, ${month} months and ${day} days.`;
}
