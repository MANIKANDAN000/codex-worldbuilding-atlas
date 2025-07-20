const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, default: '' }, // This will hold rich text/HTML later
    world: { type: mongoose.Schema.Types.ObjectId, ref: 'World', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Article', ArticleSchema);