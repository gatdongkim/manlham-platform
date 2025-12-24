const Ticket = require('./ticket.model');

// @desc    Create a new support ticket
exports.createTicket = async (req, res) => {
    try {
        const { subject, category, description, relatedJob } = req.body;
        
        const ticket = await Ticket.create({
            sender: req.user.id,
            subject,
            category,
            description,
            relatedJob
        });

        res.status(201).json({ success: true, data: ticket });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get all tickets for the logged-in user (Client/Pro view)
exports.getMyTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({ sender: req.user.id }).sort('-createdAt');
        res.status(200).json({ success: true, data: tickets });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Admin: Update ticket status or priority
exports.updateTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        
        if (!ticket) return res.status(404).json({ message: "Ticket not found" });
        
        res.status(200).json({ success: true, data: ticket });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};