const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary

          
cloudinary.config({ 
  cloud_name: 'dozddxjyh', 
  api_key: '688812823273888', 
  api_secret: 'Xw3uv2nFRKjM0dqHPf7QCg1T2jQ' 
});
// Set up Cloudinary storage engine
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Products',
    format: async (req, file) => 'jpg', // supports promises as well
    public_id: (req, file) => file.fieldname + '-' + Date.now()
  },
});

// Initialize multer with Cloudinary storage
const upload = multer({
  storage: cloudinaryStorage,
  limits: { fileSize: 10000000 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single('profilePic'); // Expect a single file upload with the name 'profilePic'

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Upload File Function
const uploadFile = (req, res) => {
  return new Promise((resolve, reject) => {
    upload(req, res, (err) => {
      if (err) {
        resolve("Invalid file");
      } else if (req.file == undefined) {
        resolve("No file selected");
      } else {
        resolve({ 
          message: 'File uploaded successfully',
          url: req.file.path,
          cloudMessage: "File is also uploaded on Cloudinary"
        });
       
      }
    });
  });
};

// Handle Upload Function
const handleUpload = async (req, res) => {
  try {
    const result = await uploadFile(req, res);
    //console.log("File Uploaded 111",result);
    return "File uploaded 9999".result;
    //res.send(result);
  } catch (error) {
    //res.status(400).send({ message: error });
  }
};


module.exports = { uploadFile }



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