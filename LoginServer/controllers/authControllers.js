const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');
const { validationResult } = require('express-validator');
// Use the loaded JWT_SECRET from process.env
const JWT_SECRET = process.env.JWT_SECRET;
//Register Controller
exports.register = async (req, res) => {
     // Validate request data using express-validator
     const errors = validationResult(req);

     // If there are validation errors, return a 400 Bad Request response
     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
     }
    const { username,password,phone,email} = req.body;

    try {
          // Check if user with given mobile number already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: 'User with this email already exists.' });
  }
  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user data to MongoDB database with the hashed password
  const user = new User({ username, password: hashedPassword, phone, email });
  await user.save();
  res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
// Login Controller
exports.login = async(req,res)=>{
     // Validate request data using express-validator
     const errors = validationResult(req);

     // If there are validation errors, return a 400 Bad Request response
     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
     }
  const   {email,password} = req.body;
    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if the password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // Return the token in the response
        res.status(201).json({ message: 'Login Successfull',token });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    } 
}