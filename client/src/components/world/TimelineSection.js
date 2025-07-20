import React, { useState } from 'react';
import worldService from '../../api/world.service';
import './TimelineSection.css'; // We'll create a simple CSS file for styling

function TimelineSection({ world }) {
    // State for the new event form
    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!date || !title) {
            alert('Please provide at least a date and a title for the event.');
            return;
        }

        const newEvent = { date, title, description };

        // Call the API service to create the event
        worldService.createTimelineEvent(world._id, newEvent)
            .then(() => {
                // Clear the form fields on successful submission
                setDate('');
                setTitle('');
                setDescription('');
                // The parent WorldPage's socket listener will handle re-rendering
            })
            .catch(err => {
                console.error("Error creating timeline event:", err);
                alert("Failed to create event. Please try again.");
            });
    };

    // A simple sort to keep events in order, can be made more robust
    const sortedEvents = world.timelineEvents?.sort((a, b) => a.date.localeCompare(b.date));

    return (
        <section className="timeline-section">
            <h3>Timeline of Events</h3>
            
            <div className="timeline-list">
                {sortedEvents && sortedEvents.length > 0 ? (
                    <ul>
                        {sortedEvents.map(event => (
                            <li key={event._id} className="timeline-item">
                                <div className="timeline-date">{event.date}</div>
                                <div className="timeline-content">
                                    <strong>{event.title}</strong>
                                    {event.description && <p>{event.description}</p>}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No events have been recorded in this world's history yet.</p>
                )}
            </div>

            <hr />

            <form onSubmit={handleSubmit} className="timeline-form">
                <h4>Add a New Event to the Timeline</h4>
                
                <label htmlFor="event-date">Date / Era</label>
                <input
                    id="event-date"
                    type="text"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    placeholder="e.g., Year 1054, or First Age: 212"
                    required
                />
                
                <label htmlFor="event-title">Event Title</label>
                <input
                    id="event-title"
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="The Sundering of the Continents"
                    required
                />
                
                <label htmlFor="event-description">Description (Optional)</label>
                <textarea
                    id="event-description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    rows="4"
                    placeholder="Describe the key moments and consequences of the event..."
                ></textarea>
                
                <button type="submit">Add Event</button>
            </form>
        </section>
    );
}

export default TimelineSection;