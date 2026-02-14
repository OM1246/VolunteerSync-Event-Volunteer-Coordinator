
import express from 'express';
import Event from '../models/Event.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to protect routes
const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// @desc    Get all events
// @route   GET /api/events
// @access  Public
router.get('/', async (req, res) => {
    try {
        const events = await Event.find({}).populate('host', 'name email');
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Create a new event
// @route   POST /api/events
// @access  Private (Host only)
router.post('/', protect, async (req, res) => {
    const { title, description, date, location } = req.body;

    if (req.user.role !== 'host') {
        return res.status(403).json({ message: 'Only hosts can create events' });
    }

    try {
        const event = new Event({
            title,
            description,
            date,
            location,
            host: req.user._id,
        });

        const createdEvent = await event.save();
        
        // Add event to host's createdEvents
        req.user.createdEvents.push(createdEvent._id);
        await req.user.save();

        res.status(201).json(createdEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Join an event
// @route   POST /api/events/:id/join
// @access  Private (Volunteer only)
router.post('/:id/join', protect, async (req, res) => {
    if (req.user.role !== 'volunteer') {
        return res.status(403).json({ message: 'Only volunteers can join events' });
    }

    try {
        const event = await Event.findById(req.params.id);

        if (event) {
            if (event.volunteers.includes(req.user._id)) {
                return res.status(400).json({ message: 'You have already joined this event' });
            }

            event.volunteers.push(req.user._id);
            await event.save();

            // Add event to volunteer's registeredEvents
            req.user.registeredEvents.push(event._id);
            await req.user.save();

            res.json({ message: 'Event joined successfully' });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get events for a specific host
// @route   GET /api/events/my-events
// @access  Private (Host only)
router.get('/my-events', protect, async (req, res) => {
    if (req.user.role !== 'host') {
        return res.status(403).json({ message: 'Authorized access only' });
    }
    try {
        const events = await Event.find({ host: req.user._id }).populate('volunteers', 'name email');
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get registered events for a volunteer
// @route   GET /api/events/my-activity
// @access  Private (Volunteer only)
router.get('/my-activity', protect, async (req, res) => {
    if (req.user.role !== 'volunteer') {
        return res.status(403).json({ message: 'Authorized access only' });
    }
    try {
        const user = await User.findById(req.user._id).populate('registeredEvents');
        res.json(user.registeredEvents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
