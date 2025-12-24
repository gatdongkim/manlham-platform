const express = require('express');
const router = express.Router();
const { createTicket, getMyTickets, updateTicket } = require('./ticket.controller');
const { authMiddleware } = require('../../middlewares/auth.middleware');

// Routes for both MSMEs and PROs
router.post('/', authMiddleware(['MSME', 'PRO']), createTicket);
router.get('/my-tickets', authMiddleware(['MSME', 'PRO']), getMyTickets);

// Routes for ADMIN only
router.patch('/:id', authMiddleware(['ADMIN']), updateTicket);

module.exports = router;