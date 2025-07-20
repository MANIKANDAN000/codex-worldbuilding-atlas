// server/controllers/worldController.js

const World = require('../models/World');

// @desc    Get all worlds for the logged-in user
// @route   GET /api/worlds
exports.getAllWorlds = async (req, res) => {
    try {
        // req.user._id is available because of the isAuthenticated middleware
        const worlds = await World.find({ owner: req.user._id }).sort({ createdAt: -1 });
        res.json(worlds);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get a single world by its ID
// @route   GET /api/worlds/:worldId
exports.getOneWorld = async (req, res) => {
    try {
        const world = await World.findById(req.params.worldId);
        if (!world) {
            return res.status(404).json({ msg: 'World not found' });
        }
        // Ensure the logged-in user owns this world
        if (world.owner.toString() !== req.user._id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        res.json(world);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Create a new world
// @route   POST /api/worlds
exports.createWorld = async (req, res) => {
    const { title, description } = req.body;
    try {
        const newWorld = new World({
            title,
            description,
            owner: req.user._id,
        });
        const world = await newWorld.save();
        res.status(201).json(world);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// --- Sub-document Creation Controllers ---
// Note: These all follow the same pattern

const updateAndEmit = async (req, res, world) => {
    await world.save();
    // Use the socket.io instance attached to the req object in server.js
    req.io.to(world._id.toString()).emit('world_updated', world);
    res.status(201).json(world);
};

exports.createArticle = async (req, res) => {
    try {
        const world = await World.findById(req.params.worldId);
        if (!world) return res.status(404).json({ msg: 'World not found' });
        world.articles.push({ title: req.body.title, content: req.body.content });
        await updateAndEmit(req, res, world);
    } catch (err) { res.status(500).send('Server Error'); }
};

exports.createMapPin = async (req, res) => {
    try {
        const world = await World.findById(req.params.worldId);
        if (!world) return res.status(404).json({ msg: 'World not found' });
        world.mapPins.push({ lat: req.body.lat, lng: req.body.lng, name: req.body.name, description: req.body.description });
        await updateAndEmit(req, res, world);
    } catch (err) { res.status(500).send('Server Error'); }
};

exports.createTimelineEvent = async (req, res) => {
    try {
        const world = await World.findById(req.params.worldId);
        if (!world) return res.status(404).json({ msg: 'World not found' });
        world.timelineEvents.push({ date: req.body.date, title: req.body.title, description: req.body.description });
        await updateAndEmit(req, res, world);
    } catch (err) { res.status(500).send('Server Error'); }
};