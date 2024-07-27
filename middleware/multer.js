// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// export const upload = multer({
//   storage,
// });

import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Configure AWS SDK
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Create an S3 instance
const s3 = new aws.S3();

// Set up multer to use multer-s3 to store files in the S3 bucket
export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE, // Automatically set the content type
    acl: 'public-read', // Access control list, setting it to 'public-read' makes the files public
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname); // Unique filename
    },
  }),
});

// export { upload };
