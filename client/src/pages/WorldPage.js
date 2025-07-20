import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import worldService from '../api/world.service';
import { useSocket } from '../context/SocketContext';

// Import the new section components
import WikiSection from '../components/world/WikiSection'; 
import MapSection from '../components/world/MapSection';
import TimelineSection from '../components/world/TimelineSection';

function WorldPage() {
    const [world, setWorld] = useState(null);
    const [activeTab, setActiveTab] = useState('wiki');
    const { worldId } = useParams();
    const socket = useSocket();

    useEffect(() => {
        const fetchWorld = async () => {
            try {
                const response = await worldService.getOne(worldId);
                setWorld(response.data);
            } catch (error) { console.error("Error fetching world:", error); }
        };
        fetchWorld();

        if (socket) {
            socket.emit('join_world', worldId);
            const handleWorldUpdate = (updatedWorld) => {
                console.log("Real-time update received!");
                setWorld(updatedWorld);
            };
            socket.on('world_updated', handleWorldUpdate);

            return () => {
                socket.emit('leave_world', worldId);
                socket.off('world_updated', handleWorldUpdate);
            };
        }
    }, [worldId, socket]);

    if (!world) return <p>Loading world...</p>;

    return (
        <main className="world-page-container">
            <Link to="/dashboard">← Back to Dashboard</Link>
            <h1>{world.title}</h1>
            <p>{world.description}</p>
            <hr />

            <nav className="world-tabs">
                <button onClick={() => setActiveTab('wiki')} className={activeTab === 'wiki' ? 'active' : ''}>Wiki</button>
                <button onClick={() => setActiveTab('map')} className={activeTab === 'map' ? 'active' : ''}>Map</button>
                <button onClick={() => setActiveTab('timeline')} className={activeTab === 'timeline' ? 'active' : ''}>Timeline</button>
            </nav>

            <div className="tab-content">
                {activeTab === 'wiki' && <WikiSection world={world} />}
                {activeTab === 'map' && <MapSection world={world} />}
                {activeTab === 'timeline' && <TimelineSection world={world} />}
            </div>
        </main>
    );
}

export default WorldPage;