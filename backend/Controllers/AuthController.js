
import Student from '../models/Student.js';
import Professor from '../models/Professor.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, {
        expiresIn: '15d',
    });
};

export const register = async (req, res) => {
    const { email, password, name, role } = req.body;
    try {
        let user = null;
        
        // Check if user exists
        if (role === 'student') {
            user = await Student.findOne({ email });
        } else if (role === 'professor') {
            user = await Professor.findOne({ email });
        }

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create user based on role
        if (role === 'student') {
            user = new Student({
                name,
                email,
                password: hashPassword,
                role,
            });
        } else if (role === 'professor') {
            user = new Professor({
                name,
                email,
                password: hashPassword,
                role,
            });
        }

        await user.save();

        res.status(201).json({ success: true, message: 'User successfully created' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = null;

        // Find user in both Student and Professor models
        const student = await Student.findOne({ email });
        const professor = await Professor.findOne({ email });

        if (student) {
            user = student;
            console.log('Logged in as student:', user); // Debug: Log student details
        } else if (professor) {
            user = professor;
            console.log('Logged in as professor:', user); // Debug: Log professor details
        }

        if (!user) {
            console.log('User not found'); // Debug: User not found
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            console.log('Invalid credentials'); // Debug: Invalid password
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate token
        const token = generateToken(user);

        // Destructure user data
        const { password: userPassword, role, ...rest } = user._doc;

        // Debug: Log user data being returned
        console.log('Returning user data:', {
            ...rest,
            studentId: user.studentId || null, // Ensure studentId is included if applicable
        });

        // Respond with user data and token
        res.status(200).json({
            success: true,
            message: 'Successfully logged in',
            token,
            data: {
                ...rest,
                studentId: user.studentId || null, // Ensure studentId is included if applicable
            },
            role,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to login' });
    }
};
