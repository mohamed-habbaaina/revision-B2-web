import React from 'react';

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function Article({ article, onClick }) {
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
    if (charCount >= 10) {
        resumContent += '...';
    }

    const formattedCreatedAt = formatDate(article.createdAt);
    const formattedUpdatedAt = formatDate(article.updatedAt);

    return (
        <div>
            <h2><button className="article" onClick={onClick}>{article.title}</button></h2>
            <p>Content: {resumContent}</p>
            <p>Created date: {formattedCreatedAt}</p>
            <p>Updated date: {formattedUpdatedAt}</p>
        </div>
    );
}

export default Article;
