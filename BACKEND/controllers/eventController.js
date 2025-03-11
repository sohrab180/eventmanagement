const Event = require('../models/eventManagement');

// Create Event
exports.createEvent = async (req, res) => {
    try {
        const { title, description, date, location } = req.body;
        const event = new Event({ title, description, date, location });
        await event.save();
        res.status(201).json({ success: true, message: "Event created successfully", event });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get All Events
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json({ success: true, events });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Single Event by ID
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ success: false, message: "Event not found" });

        res.status(200).json({ success: true, event });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update Event
exports.updateEvent = async (req, res) => {
    try {
        const { title, description, date, location } = req.body;
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            { title, description, date, location },
            { new: true, runValidators: true }
        );
        if (!event) return res.status(404).json({ success: false, message: "Event not found" });

        res.status(200).json({ success: true, message: "Event updated successfully", event });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete Event
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) return res.status(404).json({ success: false, message: "Event not found" });

        res.status(200).json({ success: true, message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
