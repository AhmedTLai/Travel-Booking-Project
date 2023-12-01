const db = require('../db')
// const fs = require('fs')
// const path = require('path');
const { v2 } = require('cloudinary');
const cloudinary = v2;
var file;

cloudinary.config({ 
  cloud_name: 'dwkxpjgor', 
  api_key: '344187378176722', 
  api_secret: "lJVlLSbMqsrMq81BPmjSlXiTWRA" 
});

async function getImageVersion(publicId) {
  try {
    const result = await cloudinary.api.resource(publicId);
    return result.version;
  } catch (error) {
    console.error('Error fetching image version:', error.message);
    return null;
  }
}

  
  const UploadC = (req, res) => {
    // Handle the uploaded file here
    // const file = req.file;
    file = req.file 
   
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }
    res.status(200).json('File uploaded successfully.');
  };
 


const addTour = (req,res)=>{
const AddTourQ = "INSERT INTO `tours` (`title`, `city`, `distance`, `price`, `maxGroupSize`, `desc`, `photo`) VALUES (?)"




const {title,city,distance,price,maxGroupSize,desc} = JSON.parse(req.body.data)
const photo = req.file.filename

const data = [
    title,
    city, 
    distance,
    price,
    maxGroupSize,
    desc,
    photo
    // featured
]

db.query(AddTourQ,[data],(err,result)=>{
    if(err) {
        return res.status(500).json(err)
    }
    return res.status(200).json('Success!')
})

}




const editTour = (req, res) => {
  const { id } = req.params;
  const updatedDataString = req.body.inp; // Assume it's a JSON string
  const file = req.file;
  // console.log(file);

  if (!file && updatedDataString === undefined) {
    return res.status(400).json({ error: 'No content provided. Please fill the inputs.' });
  }

  const getTour = 'SELECT * FROM tours WHERE tour_id=?';
  db.query(getTour, [id], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    } 
 
    if (data.length > 0) {


      // const basePath = path.join(__dirname, '..', '..','..','client','public', 'upload');
      // const basePath = `../client/public/upload`
      // Assuming 'data[0].photo' contains the file name (e.g., 'example.jpg')


      const fileName = data[0].photo;
      
      // const filePath = path.join(basePath, fileName);


      // Check if either the file or updatedDataString is defined
      if (file?.filename !== fileName || updatedDataString !== undefined) {
        // Initialize updatedData as an empty object
        let updatedData = {};

        // Try parsing the JSON string, catch potential errors
        try {
          if (updatedDataString && !file && typeof updatedDataString === 'string') {
            updatedData = JSON.parse(updatedDataString);
          } else {
            updatedData = {};
          }
        } catch (error) {
          console.error('Error parsing JSON string:', error);
          return res.status(400).json({ error: 'Invalid JSON string in input data.' });
        }

        const setClauses = [];
        const values = [];

        for (const field in updatedData) {
          setClauses.push(`${'`' + field + '`'}=?`);
          values.push(updatedData[field]);
        }

        // Check if the file is defined
        if (file) {
          setClauses.push('`photo`=?');
          values.push(file?.filename);
        }

        const updateQuery = `UPDATE tours SET ${setClauses.join(', ')} WHERE tour_id = ?`;
        values.push(id);

        db.query(updateQuery, values, (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json(err);
          } else {
            // fs.unlink(filePath, (err) => {
            //   if (err) {
            //     console.error('Error deleting file:', err);
            //     res.status(500).json(err);
            //   } else {
            //     console.log('File deleted successfully');
            //     res.json({ message: 'Tour updated successfully.' });
            //   }
            // });
            cloudinary.uploader.destroy(fileName,(err)=>{
              if(err){
                console.log(err)
              }
            })
            res.status(200).json('success')
          }
        });
      } else {
        return res.status(400).json('File already stored.');
      }
    }
  });
};

const deleteTour = (req,res)=>{
    const deleteTourQ = 'DELETE FROM tours WHERE tour_id=?'
    const getTour = 'SELECT * FROM tours WHERE tour_id=?'
    const id = req.params.id
    db.query(getTour,[id],(err,result)=>{
        if(err){
            return res.status(500).json(err)
        }
        else{
            if(result.length > 0){
              db.query(deleteTourQ,[id],(err,data)=>{
                if(err){
                  return res.status(500).json(err)
              }
              const filename = result[0].photo
                // const filePath = `https://res.cloudinary.com/dwkxpjgor/image/upload/v1701122528/${result[0].photo}`

              // fs.unlink(filePath, (err) => {
              //   if (err) {
              //     console.error('Error deleting file:', err);
              //   } else {
              //     console.log('File deleted successfully.');
              //   }
              // });

              cloudinary.uploader.destroy(filename,(err)=>{
                console.log(err)
              })

              return res.status(200).json('success')
              })
            }
        }
    })

}


const GetTours = (req, res) => {
  const GetToursQ = 'SELECT * FROM tours';

  db.query(GetToursQ, (err, data) => {
      if (err) {
          console.error('Error in GetTours:', err);
          return res.status(500).json({ error: 'Internal Server Error', details: err.message });
      } else {

        // const version = getImageVersion(data.photo)
          return res.status(200).json(data);
      } 
  });
};

module.exports = {addTour,editTour,deleteTour,GetTours,UploadC}