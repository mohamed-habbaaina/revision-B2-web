const articles = [
    { titre: "Article 1", utilisateur: "user1" },
    { titre: "Article 2", utilisateur: "user2" },
    { titre: "Article 3", utilisateur: "user1" },
    { titre: "Article 4", utilisateur: "user3" },
    { titre: "Article 5", utilisateur: "user2" }
];

function filterUser(array) {
    let articleUser1 = '';
    let articleUser2 = '';
    let articleUser3 = '';
    
    for (const article of array) {
        if (article.utilisateur === 'user1') {
            if (articleUser1 !== '') {
                articleUser1 += ', ';
            }
            articleUser1 += article.titre;
        } else if (article.utilisateur === 'user2') {
            if (articleUser2 !== '') {
                articleUser2 += ', ';
            }
            articleUser2 += article.titre;
        } else if (article.utilisateur === 'user3') {
            if (articleUser3 !== '') {
                articleUser3 += ', ';
            }
            articleUser3 += article.titre;
        }
    }

    return { articleUser1, articleUser2, articleUser3 };
}

const { articleUser1, articleUser2, articleUser3 } = filterUser(articles);

console.log("Les articles de user1 sont : ", articleUser1);
console.log("Les articles de user2 sont : ", articleUser2);
console.log("Les articles de user3 sont : ", articleUser3);

    // Mettre à jour le contenu de l'élément HTML
    const html = document.getElementById('root');
    if (html) {
        html.innerHTML = `Les articles de user1 sont : (${articleUser1}).<br>
                          Les articles de user2 sont : (${articleUser2}).<br>
                          Les articles de user3 sont : (${articleUser3}).`
        ;
    }
