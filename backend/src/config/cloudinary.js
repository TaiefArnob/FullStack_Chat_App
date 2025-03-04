import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

dotenv.config();

const { v2: cloudinaryV2 } = cloudinary;

cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryV2,
  params: {
    folder: 'profile_pictures',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

export const upload = multer({ storage });
export default cloudinaryV2;
