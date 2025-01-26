// config/multerConfig.js
import multer from 'multer';
import path from 'path';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinaryConfig.js';

// Configure storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory where files will be stored temporarily
    },
    filename: (req, file, cb) => {
        // Rename the file with a unique identifier
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Multer file filter (optional: filter to allow only specific file types like PDFs)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed'), false);
    }
};

// Configure Multer with Cloudinary Storage
const storageImg = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'student_profiles', // Cloudinary folder name
        allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'], // Allowed file types
    },
});

// Initialize and export the upload middleware
export  const upload = multer({ storage, fileFilter });
export const uploadImg = multer({storageImg});
