// routes/RegistrationRoutes.js
import express from 'express';
import RegistrationController from '../Controller/RegistrationController.js';

const router = express.Router();

// Route to create a new registration
router.post('/registrations', RegistrationController.createRegistration);

// Route to get all registrations
router.get('/registrations', RegistrationController.getRegistrations);

// Route to get a registration by ID
router.get('/registrations/:id', RegistrationController.getRegistrationById);

// Route to update a registration by ID
router.put('/registrations/:id', RegistrationController.updateRegistration);

// Route to delete a registration by ID
router.delete('/registrations/:id', RegistrationController.deleteRegistration);

export default router;
