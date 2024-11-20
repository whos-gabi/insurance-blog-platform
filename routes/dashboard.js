// routes/dashboard.js
const express = require('express');
const router = express.Router();
const { validateToken } = require('../functions');
const {
  createDocument,
  readDocuments,
  updateDocument,
  deleteDocument,
} = require('../db');
const { ObjectId } = require('mongodb');

// JWT Validation Middleware for all routes in this router
router.use(validateToken);


router.get('/', (req, res) => {
    res.render('index', { path: 'pages/dashboard', req: req });
});

const collectionName = 'blogposts';

// Blog Post Schema
/*
  {
    title: String,
    postDate: String, // format: dd.MM.yyyy
    ytLink: String, // optional
    image: String, // base64 encoded image, optional
    sections: [
      {
        subtitle: String, // optional
        text: String, // required
      },
    ],
  }
*/

router.post('/addBlogPost', async (req, res) => {
  try {
    const { title, postDate, ytLink, image, sections } = req.body;

    // Input validation
    if (!title || !postDate || !sections || !Array.isArray(sections) || sections.length === 0) {
      return res.status(400).json({ message: 'Missing required fields or sections' });
    }

    // Validate each section
    // for (const section of sections) {
    //   if (!section.text) {
    //     return res.status(400).json({ message: 'Each section must have text content' });
    //   }
    // }

    const newPost = {
      title,
      postDate,
      ytLink: ytLink || null,
      image: image || null,
      sections: sections.map((section) => ({
        subtitle: section.subtitle || null,
        text: section.text,
      })),
    };

    const insertedId = await createDocument(collectionName, newPost);
    res.status(201).json({ message: 'Blog post created', id: insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Error adding blog post', error: error.message });
  }
});

// Delete a blog post by ID
router.delete('/deleteBlogPost/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid blog post ID' });
    }

    const deletedCount = await deleteDocument(collectionName, id);

    if (deletedCount === 1) {
      res.status(200).json({ message: 'Blog post deleted' });
    } else {
      res.status(404).json({ message: 'Blog post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog post', error: error.message });
  }
});

router.put('/updateBlogPost/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate ID
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid blog post ID' });
    }

    // Input validation
    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'No update data provided' });
    }

    // Optional: Validate updateData fields in case of unwanted fields being passed or updating fields that should not be updated

    const modifiedCount = await updateDocument(collectionName, id, updateData);

    if (modifiedCount === 1) {
      res.status(200).json({ message: 'Blog post updated' });
    } else {
      res.status(404).json({ message: 'Blog post not found or no changes made' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog post', error: error.message });
  }
});

// Get all blog posts
router.get('/getPosts', async (req, res) => {
  try {
    const posts = await readDocuments(collectionName);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving blog posts', error: error.message });
  }
});

router.get('/getPostByID/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid blog post ID' });
    }

    const posts = await readDocuments(collectionName, { _id: new ObjectId(id) });

    if (posts.length === 1) {
      res.status(200).json(posts[0]);
    } else {
      res.status(404).json({ message: 'Blog post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving blog post', error: error.message });
  }
});

module.exports = router;
