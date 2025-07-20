const Article = require('../models/Article.model');
const World = require('../models/World');

exports.createArticle = async (req, res) => {
    const { title, content } = req.body;
    const { worldId } = req.params;

    try {
        // Security check: Ensure user has access to this world (simplified for now)
        const world = await World.findById(worldId);
        if (!world || world.owner.toString() !== req.user.id) {
             return res.status(403).json({ message: 'Not authorized to add article to this world' });
        }

        const article = await Article.create({ title, content, world: worldId });

        // Add article reference to the world
        world.articles.push(article._id);
        await world.save();

        res.status(201).json(article);
    } catch (error) {
        res.status(500).json({ message: 'Error creating article', error: error.message });
    }
};