// controllers/UserController.js
import UserModel from '../Model/UserModel.js';
import bcrypt from 'bcrypt';

// Register a new user
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create new user
        const user = new UserModel({ name, email, password });
        await user.save();
        
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error: 'Failed to register user' });
    }
};

// Login a user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        
        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.error('Error logging in user:', err);
        res.status(500).json({ error: 'Failed to log in user' });
    }
};
