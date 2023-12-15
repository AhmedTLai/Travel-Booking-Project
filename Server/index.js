const express = require('express')
const db = require('./db')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const AuthR = require('./routes/AuthR')
const TourR = require('./routes/tourR') 
const EditProfileR = require('./routes/EditProfileR')
const { verifyAdmin, verifyUser, verifyToken } = require('./util/verifyToken')
const app = express()


app.use((req,res,next)=>{
    console.log('working')
    next()
})
app.use(bodyParser.urlencoded({limit : '50mb',extended : true}))
app.use(bodyParser.json({limit : '50mb'}))
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: 'https://travel-booking-project-orpin.vercel.app',
    // origin : 'http://localhost:5173',
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}))
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
// })
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
//     });
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "http://192.168.1.129:5173");
//     res.header("Access-Control-Allow-Methods", "*");
//     res.header("Access-Control-Allow-Headers", "Content-Type");
//     next();
//   })
// app.use((req, res, next) => {
//     console.log('Request Headers:', req);
//     next();
//  }); 
// app.use(verifyAdmin)
// app.use(verifyUser)
// app.use(verifyToken) 

app.use((req,res,next)=>{
    setTimeout(()=>{
        next()
    },3000)
})

app.use('/api/user',AuthR)
app.use('/api/tour',TourR)
app.use('/api/userconf',EditProfileR)

 


app.get('/',(req,res)=>{
  
    res.json('its working fine !')
})



const connection = () => {
    const connectDB = () => {
        db.getConnection((err) => {
            if (err) {
                console.error('Error connecting to MySQL:', err);
                throw err
                // if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
                //     console.error('Reconnecting to the database...');
                //     setTimeout(connectDB, 2000);
                // } else {
                //     throw err;
                // }
            } else {
                app.listen(80, 
                    () => {
                    console.log('worked');
                }
                ); 
            } 
        });
    };

    // Handle MySQL errors and reconnect
    // db.on('error', (err) => {
    //     console.error('DB error', err);
    //     if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.fatal) {
    //         console.error('Reconnecting to the database...');
    //         connectDB();
    //     } else {
    //         throw err;
    //     }
    // });

    // // Initial database connection
    connectDB();
};

connection();



