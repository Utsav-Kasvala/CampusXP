// config/multerConfig.js
import multer from 'multer';
import path from 'path';

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

// Initialize and export the upload middleware
export  const upload = multer({ storage, fileFilter });
