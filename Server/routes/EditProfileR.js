const express = require('express')
const { editProfile } = require('../Controllers/EditProfileC')
const router = express.Router()

const multer = require('multer');
const { verifyUser } = require('../util/verifyToken');
const { v2 } = require('cloudinary');
const cloudinary = v2;

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
}); // Use memory storage for handling the file in memory
const upload = multer({ storage: storage });

const multerU = upload.single('profileImg'); // Use upload middleware to handle the file upload

cloudinary.config({ 
  cloud_name: 'dwkxpjgor', 
  api_key: '344187378176722', 
  api_secret: "lJVlLSbMqsrMq81BPmjSlXiTWRA" 
});

const uploadPic = async (req, res, next) => {
  try {
    if (!req.file) {
      return next()
    } 

    // Use the Cloudinary uploader with the file buffer
    const result = await cloudinary.uploader.upload(req.file.path, {
      // upload_preset: 'BookingTravel-Assets',
      public_id: req.file.filename,
    });

    // console.log(req.file.path);
    console.log(result)
    // Handle addTour logic with the result from Cloudinary
    // For example:
    // await addTour({ image: result.url, ...otherTourData });

    
    next()
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



router.put('/editProfile/:id',verifyUser,multerU,uploadPic,editProfile)

module.exports = router