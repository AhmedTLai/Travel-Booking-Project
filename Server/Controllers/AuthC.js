const db = require('../db')
const bc = require('bcrypt')
const jw = require('jsonwebtoken')
 

const RegisterC = (req,res) =>{
const {fullname ,email,password} = req.body
const checkQ = 'SELECT * FROM users WHERE email=?'

db.query(checkQ,[email],(err , result)=>{
    if(err) {return res.status(500).json(err)}
    if(result.length > 0){
        return res.status(400).json('User already exist please try auther email address')
    }
    else{
        const createUserQ = 'INSERT INTO users(fullname,email,password) VALUES(?,?,?)'
        const salt = bc.genSaltSync(12)
        const cryptedPW = bc.hashSync(password,salt)
        if(password.length >= 8){
            db.query(createUserQ,[fullname,email,cryptedPW],(err, data)=>{
            if(err) {return res.status(500).json(err)}
            return res.status(200).json('You registred with success')
        })
        }else{ 
            res.status(400).json('Password must have at least 8 characters !')
        }
        
    }
})


}


const LoginC = (req, res) => {
    const CheckEQ = 'SELECT * FROM users WHERE email=?';
    const { email, password } = req.body;

    db.query(CheckEQ, [email], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (result.length > 0) {
            const uncryptedPW = bc.compareSync(password, result[0].password);

            if (uncryptedPW) {
                const token = jw.sign({ id: result[0].id }, 'Auth_Token'); // Correct the signing

                const { password, ...other } = result[0]; // Removed .data
                res.cookie('Auth_Token', token, {
                    httpOnly: true,
                    secure : true,
                    sameSite: 'None', // Required for cross-site cookies in browsers that enforce SameSite restrictions
                  }).status(200).json(other); // Send 'other' instead of 'data'
            } else {
                return res.status(400).json('Wrong password, please try again');
            }
        } else {
            return res.status(400).json('You entered a wrong email, please use a valid one');
        }
    });
};



const LogOut = (req,res)=>{
res.status(200).json('loged out')
}


const DeleteAccount = (req,res)=>{
    const user_id = req.params.user_id
    const deleteAccountQ = 'DELETE FROM users WHERE user_id=?'

    db.query(deleteAccountQ,[user_id],(err,result)=>{
        if(err) return res.status(500).json(err)
        return res.status(200).json('Success!')
    })
}

module.exports = {RegisterC,LoginC,LogOut,DeleteAccount}