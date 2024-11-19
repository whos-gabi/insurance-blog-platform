//functii generale de acces la baza de date

const PostForma = new mongoose.Schema({
    titlu : String,
    post_data : String,
    vizibil : Boolean,
    imagine : String,
    youTube : String,
    continut : [{
        subTitlu : String,
        text : String
    }]
})

const Post = mongoose.model('Post', postSchema);

const DB  = require('mongodb');
require("dotenv").config();

async function addBlog( DB_URL, post ) { 
    
    const client = new DB(DB_URL);

    try{
        await client.conect();
        const result = await client.collection("posturi").insertOne(post);

        return result;
    }
    catch(e){
        console.error(e);
    }
    finally{
        client.close();
    }
}

async function getAllBlogs( DB_URL ){
    
    const client = new DB(DB_URL);

    try{
        await client.conect();

        const posts = await Post.find();
        return posts;
        
    }
    catch(e){
        console.error(e);
    }
    finally{
        client.close();
    }
}

async function getBlogById(DB_URL, ID){
    const client = new DB(DB_URL);

    try{
        await client.conect();

        const post = await Post.findById(ID);
        if(!post){
            throw new Error('Postul nu a fost gasit');
        }
        
        return post;
    }
    catch(e){
        console.error(e);
    }
    finally{
        client.close();
    }
}

module.exports = {
    addBlog,
    getAllBlogs,
    getBlogById,
    PostForma,
    Post
};