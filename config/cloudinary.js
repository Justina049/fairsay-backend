const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set up the storage engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'fairsay_evidence', // This folder will be created in your Cloudinary media library
    allowed_formats: ['jpg', 'png', 'jpeg', 'pdf'], 
    transformation: [{ width: 1000, crop: "limit" }] 
  },
});

// Initialize Multer with the Cloudinary storage
const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };