const express = require("express");  // pentru a crea servere web și a gestiona rutele API.
const router = express.Router();     // submodul ce ajută la organizarea și modularizarea rutelor aplicației
const dotenv = require('dotenv');    // pentru  încărcarea variabilelor de mediu dintr-un fișier .env în aplicație
const jwt = require('jsonwebtoken'); // pentru crearea și validarea tokenurilor JWT
const sha256 = require('sha256');    // pentru criptarea și compararea parolelor

dotenv.config();

router.post('/autentificare-admin', async (req, res) => {
    const {username, parola} = req.body;

    try{

        if( username === process.env.ADMIN_USERNAME && sha256(parola) === process.env.ADMIN_PASSWORD) {// ADMIN_PASSWORD ar trebui sa fie incriptata 
            const token = jwt.sign( username , process.env.JWT_KEY);
    
            return res.status(200).json({token});
        }
        else{
            return res.status(400).json({ message : "Nume de utilizator sau parola incorecta"})
        }
    }
    catch(error){
        console.error(error);
        
    }

    

});

module.exports = router;