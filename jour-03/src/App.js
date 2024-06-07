import React, { useState } from 'react';
import './App.css';
import { articlesArray } from './data/articles';
import Article from './components/Article';

function App() {
    const [articles, setArticles] = useState(articlesArray);

    const handleArticleClick = (content) => {
        alert(content);
    };

    return (
        <div className="container">
            <header className="App-header">
                <h1>Articles</h1>
            </header>
            <main>
                {articles.map((article) => (
                    <Article
                        className="article"
                        key={article.id}
                        article={article}
                        onClick={() => handleArticleClick(article.content)}
                    />
                ))}
            </main>
        </div>
    );
}

export default App;
