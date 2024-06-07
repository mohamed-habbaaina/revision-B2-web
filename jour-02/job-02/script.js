const articlesArray = [
    { id: 1, title: 'Introduction to JavaScript',
      content: 'JavaScript is a versatile programming language used for web development.',
      createdAt: new Date('2024-01-01T10:00:00Z'),
      updatedAt: new Date('2024-01-02T12:00:00Z')
    },
    { id: 2, title: 'Understanding CSS',
      content: 'CSS is used to style HTML elements and make web pages look attractive.',
      createdAt: new Date('2024-01-05T14:00:00Z'),
      updatedAt: new Date('2024-01-06T16:00:00Z')
    },
    { id: 3, title: 'Getting Started with HTML',
      content: 'HTML is the standard markup language for creating web pages.',
      createdAt: new Date('2024-01-10T09:00:00Z'),
      updatedAt: new Date('2024-01-11T11:00:00Z')
    }
];

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function limitContent(array) {
    let htmlContent = '';
    for (const article of array) {
        let resumContent = '';
        let charCount = 0;
        // Limiter le contenu à 10 caractères
        for (const char of article.content) {
            if (charCount >= 10) {
                break;
            }
            resumContent += char;
            charCount++;
        }
        // Ajouter '...' si le contenu est tronqué
        if (charCount >= 10) {
            resumContent += '...';
        }

        const formattedCreatedAt = formatDate(article.createdAt);
        const formattedUpdatedAt = formatDate(article.updatedAt);

        // Générer le contenu HTML
        htmlContent += `<h2><button class="btn" data-content="${article.content}">Title: ${article.title}</button></h2>`;
        htmlContent += `<p>Content: ${resumContent}</p>`;
        htmlContent += `<p> Created date: ${formattedCreatedAt}</p>`;
        htmlContent += `<p> Updated date: ${formattedUpdatedAt}</p>`;
    }

    // Mettre à jour le contenu de l'élément HTML
    const html = document.getElementById('root');
    if (html) {
        html.innerHTML = htmlContent;
    }
    
    // Ajouter les écouteurs d'événements aux boutons après que le contenu HTML soit mis à jour
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            alert(button.getAttribute('data-content'));
        });
    });
}

limitContent(articlesArray);
