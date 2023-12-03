const express = require('express')
const rout = express.Router()
const {RegisterC, LoginC, LogOut,DeleteAccount} = require('../Controllers/AuthC.js')
const {verifyToken} = require('../util/verifyToken.js')

rout.post('/register',RegisterC)
rout.post('/login',LoginC)
rout.post('/logout',verifyToken,LogOut)
rout.delete('/deleteAccount/:user_id',DeleteAccount)


module.exports = rout