// // config/multerConfig.js
// import multer from 'multer';
// import path from 'path';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import cloudinary from './cloudinaryConfig.js';

// // Configure storage for Multer
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Directory where files will be stored temporarily
//     },
//     filename: (req, file, cb) => {
//         // Rename the file with a unique identifier
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// // Multer file filter (optional: filter to allow only specific file types like PDFs)
// const fileFilter = (req, file, cb) => {
//     const allowedTypes = ['application/pdf'];
//     if (allowedTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(new Error('Only PDF files are allowed'), false);
//     }
// };

// // Configure Multer with Cloudinary Storage
// const imgFilter = (req, file, cb) => {
//     const allowedTypes = ['jpg', 'jpeg', 'png', 'pdf'];
//     if (allowedTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(new Error('Only PDF files are allowed'), false);
//     }
// };
// // const storageImg = new CloudinaryStorage({
// //     cloudinary,
// //     params: {
// //         folder: 'student_profiles', // Cloudinary folder name
// //         allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'], // Allowed file types
// //     },
// // });

// // Initialize and export the upload middleware
// export  const upload = multer({ storage, fileFilter });
// export const uploadImg = multer({storage,imgFilter});
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinaryConfig.js';

// Storage for general file uploads (PDFs)
const pdfStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'pdf_uploads', // Cloudinary folder
        allowed_formats: ['pdf'], // Allow only PDFs
        public_id: (req, file) => Date.now() + '-' + file.originalname, // Unique filename
    },
});

// Storage for images (JPG, PNG)
const imageStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'image_uploads', // Cloudinary folder
        allowed_formats: ['jpg', 'jpeg', 'png'], // Allow only images
        public_id: (req, file) => Date.now() + '-' + file.originalname,
    },
});

// File filters
const pdfFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed'), false);
    }
};

const imageFilter = (req, file, cb) => {
    if (['image/jpeg', 'image/png'].includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only JPG and PNG images are allowed'), false);
    }
};

// Initialize Multer upload functions
export const upload = multer({ storage: pdfStorage, fileFilter: pdfFilter }); // For PDFs
export const uploadImg = multer({ storage: imageStorage, fileFilter: imageFilter }); // For Images
