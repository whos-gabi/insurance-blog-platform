// BLOG OBJ:

const DB  = require('mongodb');       // <--
const DB_URL = process.env.MONGO_URL; // <-- aceste doua linii trebuiesc??
require("dotenv").config();
const { addBlog, getAllBlogs, getBlogById, PostForma, Post } = require("../db.js");
const { default: mongoose } = require('mongoose');
const router = express.Router(); 

router.post('/blogPostNou', async (req, res) => {
    const {titlu, post_data, vizibil, imagine, youTube, ...container} = req.body;

    try{

        if( imagine === null && youTube === null){
            return res.status(400).json({ mesaj : "Cel putin una din campurile trebuie sa fie completata: imagine, YouTube-URL; "})
        }
        else{
            const result = await addBlog(DB_URL, req.body);
            if( result.acknowledged === true){
                return res.status(200).json({mesaj : "Postat cu succes"})
            }
            else{
                return res.status(500).json({ mesaj : "Serverul nu poate procesa request-ul"})
            }
        }
    }
    catch(e){
        console.error(e);
        
    }
})

router.get('/ToatePosturile', (req, res) => {

    try{
        
        const posts = getAllBlogs(DB_URL);

        if(posts !== null){
            res.status(200).json(posts);
        }
        else{
            res.status(404).json({mesaj : "'Postarile nu a fost găsită în baza de date'"})
        }
    }
    catch(e){
        console.error(e,"Serverul nu poate procesa request-ul");
    }
})

router.get('/unPost/:postID', (req, res) => {
    
    try{

        const post = getBlogById(DB_URL, req.body.id);

        if(!post){
            res.status(404).json({ mesaj : "Postul nu a fost gasit"})
        }
        else{
            res.status(200).json(post);
        }
    }
    catch(e){
        console.error(e,"Serverul nu poate procesa request-ul");
    }
})