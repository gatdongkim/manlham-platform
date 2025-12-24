const express = require('express');
const router = express.Router();
const { getAllProfessionalProfiles, toggleSaveProfessional } = require('./professional.controller');
const { authMiddleware } = require('../../middlewares/auth.middleware');

// Public or PRO-authenticated browse
router.get('/', getAllProfessionalProfiles);

// Only MSMEs can save professionals
router.patch('/:id/save', authMiddleware(['MSME']), toggleSaveProfessional);

module.exports = router;