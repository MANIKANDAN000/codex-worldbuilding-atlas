import React, { useState } from 'react';
import worldService from '../../api/world.service';

function WikiSection({ world }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        worldService.createArticle(world._id, { title, content })
            .then(() => {
                setTitle('');
                setContent('');
            })
            .catch(err => console.error(err));
    };

    return (
        <section>
            <h3>Wiki Articles</h3>
            {world.articles.length > 0 ? (
                <ul>
                    {world.articles.map(article => <li key={article._id}>{article.title}</li>)}
                </ul>
            ) : (
                <p>No articles yet. Create one below!</p>
            )}

            <form onSubmit={handleSubmit}>
                <h4>Create New Article</h4>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Article Title" required />
                <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Article content..."></textarea>
                <button type="submit">Create Article</button>
            </form>
        </section>
    );
}

export default WikiSection;