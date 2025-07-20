// client/src/api/world.service.js

import api from './api'; // Import the configured axios instance

// This service handles all API calls related to worlds

// --- Main World Endpoints ---

const getAll = () => {
    return api.get('/worlds');
};

const getOne = (id) => {
    return api.get(`/worlds/${id}`);
};

const create = (worldData) => {
    return api.post('/worlds', worldData);
};

// --- Sub-document Endpoints ---

const createArticle = (worldId, articleData) => {
    return api.post(`/worlds/${worldId}/articles`, articleData);
};

// THIS IS THE FUNCTION THAT WAS MISSING
const createMapPin = (worldId, pinData) => {
    return api.post(`/worlds/${worldId}/mappins`, pinData);
};

const createTimelineEvent = (worldId, eventData) => {
    return api.post(`/worlds/${worldId}/timeline`, eventData);
};


// Bundle all functions into a single object to be exported
const worldService = {
    getAll,
    getOne,
    create,
    createArticle,
    createMapPin,         // Now it's included in the export
    createTimelineEvent,
};

export default worldService;