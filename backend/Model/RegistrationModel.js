// models/RegistrationModel.js
import mongoose from 'mongoose';

// Define the schema for the registration model
const RegistrationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    eventName: {
        type: String,
        required: true,
    },
    whatsappNumber: {
        type: String,
        required: true,
    },
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Create the model using the schema
const RegistrationModel = mongoose.model('Registration', RegistrationSchema);

// Export the model
export default RegistrationModel;
