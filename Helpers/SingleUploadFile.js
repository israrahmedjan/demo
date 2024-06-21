//require("dotenv").config();
const { error } = require('console');
const { promises } = require('dns');
const multer = require('multer');
const path = require('path');


const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_API_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});


// cloudinary.config({
//   cloud_name: 'dozddxjyh',
//   api_key: '688812823273888',
//   api_secret: 'Xw3uv2nFRKjM0dqHPf7QCg1T2jQ'
// });



// File filter function to only accept JPEG and PNG images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    const error = new Error('Invalid file type. Only JPEG and PNG are allowed.');
    error.status = 400;
    cb(error, false); // Pass the error object to the callback
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const SingleuploadFile = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 1 // 5 MB file size limit
  }
}).single('ProductImages');


const SingleFileUploadOnCloudnary = async (file) => {

  try {
    const result = await cloudinary.uploader.upload(file.path);
    //console.log(`File uploaded to Cloudinary: ${result.secure_url}`);
    //res.send(`File uploaded to Cloudinary: ${result.secure_url}`);
    return result.secure_url;
  }
  catch (err) {
    console.log(err.message)
  }

  // // return mystr;

  SingleFileUploadOnCloudnary

}

module.exports = { SingleFileUploadOnCloudnary, SingleuploadFile }

// try
// {
//   const result = await cloudinary.uploader.upload(file);
//     console.log(`File uploaded to Cloudinary: ${result.secure_url}`);
//   //res.send(`File uploaded to Cloudinary: ${result.secure_url}`);
//  }
// catch(err)
// {
//   console.log(err.message)
// }