import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Validate required Cloudinary configuration
const requiredConfig = ['CLOUDINARY_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
const missingConfig = requiredConfig.filter(key => !process.env[key]);

if (missingConfig.length > 0) {
  throw new Error(`Missing required Cloudinary configuration: ${missingConfig.join(', ')}`);
}

// Note: Fixed typo in 'CLOUDINARY_API_KAY' to 'CLOUDINARY_API_KEY'
const config = {
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,secure: true // Always use HTTPS
};

// Initialize Cloudinary
cloudinary.config(config);

// Test the configuration (optional during development)
if (process.env.NODE_ENV !== 'production') {
  cloudinary.api.ping()
    .then(response => console.log('Cloudinary connection established:', response))
    .catch(err => console.error('Cloudinary connection failed:', err));
}

export default cloudinary;