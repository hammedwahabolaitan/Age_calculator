// script.js
document.addEventListener('DOMContentLoaded', function() {
    flatpickr("#birthdate", {
        enableTime: false,
        dateFormat: "Y-m-d",
        maxDate: "today",
    });
});

function calculateAge() {
    const birthdateStr = document.getElementById("birthdate").value;

    if (!birthdateStr) {
        alert("Please enter your birthdate.");
        return;
    }

    const birthDate = new Date(birthdateStr);
    const today = new Date();

    if (isNaN(birthDate)) {
        alert("Invalid birthdate entered. Please use the format YYYY-MM-DD.");
        return;
    }

    let age = today.getFullYear() - birthDate.getFullYear();
    let month = today.getMonth() - birthDate.getMonth();
    let day = today.getDate() - birthDate.getDate();

    if (month < 0 || (month === 0 && day < 0)) {
        age--;
        month = (12 + month) % 12;
        if (day < 0) {
            let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
            day = lastDayOfMonth + day;
            month--;
            if (month < 0) {
                month = 11;
            }
        }
    }


    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
        <p>Your age is ${age} years, ${month} months, and ${day} days.</p>
        <p>Or, approximately:</p>
        <ul>
            <li>${age} years</li>
            <li>${age * 12 + month} months</li>
            <li>${Math.floor((age * 365.25) + (month * 30.42) + day)} days</li>
            <li>${Math.floor(((age * 365.25) + (month * 30.42) + day) / 7)} weeks</li>
        </ul>
    `;
}


// Local Storage for Saved Birthdays
const birthdayList = document.getElementById("birthday-list");

function loadBirthdays() {
    const savedBirthdays = JSON.parse(localStorage.getItem("birthdays")) || [];
    birthdayList.innerHTML = "";
    savedBirthdays.forEach(birthdate => {
        addBirthdayToList(birthdate);
    });
}

function saveBirthday() {
    const birthdate = document.getElementById("birthdate").value;
    if (birthdate) {
        let savedBirthdays = JSON.parse(localStorage.getItem("birthdays")) || [];
        savedBirthdays.push(birthdate);
        localStorage.setItem("birthdays", JSON.stringify(savedBirthdays));
        addBirthdayToList(birthdate);
    }
}

function addBirthdayToList(birthdate) {
    const listItem = document.createElement("li");
    listItem.textContent = birthdate;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
        let savedBirthdays = JSON.parse(localStorage.getItem("birthdays")) || [];
        savedBirthdays = savedBirthdays.filter(b => b !== birthdate);
        localStorage.setItem("birthdays", JSON.stringify(savedBirthdays));
        listItem.remove();
    });
    listItem.appendChild(deleteButton);
    birthdayList.appendChild(listItem);
}

function clearBirthdays() {
    localStorage.removeItem("birthdays");
    birthdayList.innerHTML = "";
}

loadBirthdays();