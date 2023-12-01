const d = require('mysql')

// const db = d.createConnection({
//     user : 'ugdupomb9ci5b4xc',
//     host: 'bbinbaphmj2m6s2sx3im-mysql.services.clever-cloud.com',
//     database : 'bbinbaphmj2m6s2sx3im' ,
//     password : '5sWiE7Y9m9eiomCaylLg',
//     connectTimeout : 60000 * 60 * 24
// })

const db = d.createPool({
    
    user : 'ugdupomb9ci5b4xc',
    host: 'bbinbaphmj2m6s2sx3im-mysql.services.clever-cloud.com',
    database : 'bbinbaphmj2m6s2sx3im' ,
    password : '5sWiE7Y9m9eiomCaylLg',
    port : 3306,
    connectionLimit : 100,
})
  
 
module.exports = db    