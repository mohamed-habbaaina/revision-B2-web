const userArray = [
    { firstname: 'Alice', lastName: 'Dupont', isActive: true},
    { firstname: 'Bob', lastName: 'Martin', isActive: false},
    { firstname: 'Charlie', lastName: 'Durand', isActive: true},
    { firstname: 'Diana', lastName: 'Leclerc', isActive: false},
    { firstname: 'Eve', lastName: 'Lambert', isActive: true}
];

function displayActiveUser(array) {
    let htmlContent = '';  // Variable pour accumuler le contenu HTML

    for (let user of array) {
        if (user.isActive) {
            console.log(`${user.firstname} ${user.lastName} est actif`);
            htmlContent += `${user.firstname} ${user.lastName} est actif<br>`;
        }
    }

    const html = document.getElementById('root');
    html.innerHTML = htmlContent;  // Mettre à jour le contenu HTML
}

displayActiveUser(userArray);
