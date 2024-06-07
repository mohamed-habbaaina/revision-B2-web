const userArray = [
    { firstname: 'Alice', lastName: 'Dupont', isActive: true},
    { firstname: 'Bob', lastName: 'Martin', isActive: false},
    { firstname: 'Charlie', lastName: 'Durand', isActive: true},
    { firstname: 'Diana', lastName: 'Leclerc', isActive: false},
    { firstname: 'Eve', lastName: 'Lambert', isActive: true}
];

function changeActivity(fullName) {
    for (let user of userArray) {
        if (`${user.firstname} ${user.lastName}` === fullName) {
            user.isActive = !user.isActive;
        }
    }
    displayActiveUser(userArray); // Refresh the display after changing the activity
}

function displayActiveUser(array) {
    let htmlContent = '';

    for (let user of array) {
        if (user.isActive) {
            htmlContent += `<button class="user-btn" style="color: green">${user.firstname} ${user.lastName}</button><br>`;
        } else {
            htmlContent += `<button class="user-btn" style="color: red">${user.firstname} ${user.lastName}</button><br>`;
        }
    }

    const html = document.getElementById('root');
    html.innerHTML = htmlContent;

    const buttons = document.querySelectorAll('.user-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            changeActivity(button.textContent);
        });
    });
}

displayActiveUser(userArray);
