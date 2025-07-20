import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import worldService from '../api/world.service';
import './DashboardPage.css'; // Import the new CSS

function DashboardPage() {
    const [worlds, setWorlds] = useState([]);
    const [title, setTitle] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    const fetchWorlds = async () => {
        try {
            setIsLoading(true);
            const response = await worldService.getAll();
            setWorlds(response.data);
            setError(null);
        } catch (error) {
            console.error("Error fetching worlds:", error);
            setError("Failed to load your worlds. Please try refreshing the page.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user) fetchWorlds();
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await worldService.create({ title });
            setTitle('');
            fetchWorlds();
        } catch (error) {
            console.error("Error creating world:", error);
            setError("Could not create the world. Please try again.");
        }
    };
    
    if (!user) {
        return <main className="dashboard-container"><p>Authenticating...</p></main>;
    }

    return (
        <main className="dashboard-container">
            <h1 className="dashboard-title">
                <span className="title-gradient">{user.name}'s Dashboard</span>
            </h1>
            <p className="dashboard-subtitle">Manage your creative worlds or start a new one.</p>
            
            <section className="dashboard-card create-world-section">
                <h2>Create a New World</h2>
                <form onSubmit={handleSubmit} className="create-world-form">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., The Ashen Kingdom"
                        required
                        aria-label="New world title"
                    />
                    <button type="submit">Forge World</button>
                </form>
            </section>

            <section className="dashboard-card worlds-list-section">
                <h2>Your Worlds</h2>
                {isLoading && <div className="loader">Loading worlds...</div>}
                {error && <p className="error-message">{error}</p>}
                {!isLoading && !error && (
                    worlds.length > 0 ? (
                        <ul className="worlds-list">
                            {worlds.map(world => (
                                <li key={world._id} className="world-item">
                                    <Link to={`/world/${world._id}`}>
                                        <span className="world-icon">🌍</span>
                                        <span className="world-title">{world.title}</span>
                                        <span className="arrow-icon">→</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-worlds-message">You haven't created any worlds yet. Use the form above to begin!</p>
                    )
                )}
            </section>
        </main>
    );
}

export default DashboardPage;