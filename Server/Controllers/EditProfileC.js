const db = require("../db")
const { v2 } = require('cloudinary');
const cloudinary = v2;


const editProfile = (req, res) => {
    const profilePicName = req.file ? req.file.filename : null;
    const user_id = req.params.id;

    let data = [];

    if (req.body.inp) {
        try {
            const parsedData = JSON.parse(req.body.inp);
            data = [
                { email: parsedData.email },
                { fullname: parsedData.fullname },
                { password: parsedData.password }
            ];
            // console.log(parsedData);
        } catch (error) {
            data = [];
        }
    }

    const getUserData = 'SELECT * FROM users WHERE user_id=?';

    db.query(getUserData, [user_id], (err, user) => {
        if (err) return res.status(500).json(err);

        if (user.length > 0) {
            const fileName = user.profile_pic;

            if (profilePicName !== fileName || data.length > 0) {
                const setClauses = data.reduce((clauses, field) => {
                    const key = Object.keys(field)[0];
                    const value = field[key];
                    if (value !== null && value !== undefined) {
                        clauses.push(`\`${key}\`=?`);
                    }
                    return clauses;
                }, []);

                if (profilePicName) {
                    setClauses.push('`profile_pic`=?');
                    data.push({ profile_pic: profilePicName });
                }
                console.log(setClauses)
                const values = data.reduce((values, field) => {
                    const value = Object.values(field)[0];
                    if (value !== null && value !== undefined) {
                        values.push(value);
                    }
                    return values;
                }, []);

                const updateQuery = `UPDATE users SET ${setClauses.join(', ')} WHERE user_id = ?`;
                values.push(user_id);

                db.query(updateQuery, values, (err, result) => {
                    if (err) return res.status(500).json(err);

                    if (fileName) {
                        cloudinary.uploader.destroy(fileName, (err) => {
                            if (err) return console.log(err);
                        });
                    }
                    const getUserQ= "SELECT * FROM users WHERE user_id=?"
                    db.query(getUserQ,user_id,(err,UpdatedUser)=>{
                        if(err) res.status(500).json(err)
                            const {password , ...other} = UpdatedUser
                            return res.status(200).json(other);
                    })
                });
            } else { 
                return res.status(400).json({ error: 'No content provided. Please fill the inputs.' });
            }
        }
    });
};

module.exports = {editProfile}