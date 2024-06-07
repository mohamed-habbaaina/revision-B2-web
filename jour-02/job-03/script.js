const articles = [
    { titre: "Article 1", utilisateur: "user1" },
    { titre: "Article 2", utilisateur: "user2" },
    { titre: "Article 3", utilisateur: "user1" },
    { titre: "Article 4", utilisateur: "user3" },
    { titre: "Article 5", utilisateur: "user2" }
];

function groupArticlesByUser(articles) {
    const groupedArticles = {};
    for (const article of articles) {
        if (!groupedArticles[article.utilisateur]) {
            groupedArticles[article.utilisateur] = [];
        }
        groupedArticles[article.utilisateur].push(article.titre);
    }
    return groupedArticles;
}

function displayUsers(groupedArticles) {
    const userSection = document.getElementById('users');
    let htmlContent = '';
    for (const user in groupedArticles) {
        htmlContent += `<div class="user-section">
            <h2 class="user-name">${user}</h2>
            <div class="articles" style="display: none;">
                ${groupedArticles[user].map(title => `<p>${title}</p>`).join('')}
            </div>
        </div>`;
    }
    userSection.innerHTML = htmlContent;

    const userNames = document.querySelectorAll('.user-name');
    userNames.forEach(userName => {
        userName.addEventListener('click', () => {
            const articlesDiv = userName.nextElementSibling;
            if (articlesDiv.style.display === 'none') {
                articlesDiv.style.display = 'block';
            } else {
                articlesDiv.style.display = 'none';
            }
        });
    });
}

const groupedArticles = groupArticlesByUser(articles);
displayUsers(groupedArticles);
