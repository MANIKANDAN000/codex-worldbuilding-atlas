const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for an embedded article sub-document
const ArticleSchema = new Schema({
    title: { 
        type: String, 
        required: true 
    },
    content: { 
        type: String, 
        default: '' 
    },
}, { timestamps: true }); // Automatically add createdAt and updatedAt

// Define the schema for an embedded map pin sub-document
const MapPinSchema = new Schema({
    lat: { 
        type: Number, 
        required: true 
    },
    lng: { 
        type: Number, 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        default: '' 
    },
});

// Define the schema for an embedded timeline event sub-document
const TimelineEventSchema = new Schema({
    date: { 
        type: String, 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        default: '' 
    },
});


// Define the main World schema
const WorldSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true, // Removes whitespace from both ends
    },
    description: {
        type: String,
    },
    // Link to the user who owns this world
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User', // This refers to the 'User' model
        required: true,
    },
    // Embed the arrays of sub-documents directly into the world
    articles: [ArticleSchema],
    mapPins: [MapPinSchema],
    timelineEvents: [TimelineEventSchema],
}, { timestamps: true }); // Automatically add createdAt and updatedAt to the World document

// Create and export the World model
module.exports = mongoose.model('World', WorldSchema);