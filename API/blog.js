/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
const express = require('express');
const data = require('../data/db.js');

const blogPost = express.Router();


blogPost.post('/posts', (req, res) => {
  const obj = req.body;
  data.insert(obj)
    .then((post) => {
      // eslint-disable-next-line no-unused-expressions
      obj.title && obj.contents ? res.status(201).json(post) : res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
      console.log(obj.title);
    })
    .catch(() => {
      res.status(500).json({
        error: 'There was an error while saving the post to the database',
      });
    });
});

blogPost.post('/posts/:id/comments', (req, res) => {
  const obj = req.body;
  const { id } = req.params;


  data.insertComment(obj)

    .then((comment) => {
      data.findById(id).then((post) => {
        // eslint-disable-next-line no-unused-expressions

        if (obj.text && post[0]) {
          res.status(200).json([post, comment]);
        } else if (!obj.text) {
          res.status(400).json({ errorMessage: 'Please provide text for the comment.' });
        } else {
          res.status(404).json({ message: 'The post with the specified ID does not exist.' });
        }
      });
    })
    .catch(() => {
      res.status(500).json({
        error: 'There was an error while saving the comment to the database',
      });
    });
});


blogPost.get('/posts', (req, res) => {
  data.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(500).json({ error: 'The posts information could not be retrieved.' });
    });
});

blogPost.get('/posts/:id', (req, res) => {
  const { id } = req.params;

  data.findById(id)
    .then((findPost) => {
      // eslint-disable-next-line no-unused-expressions
      findPost[0] ? res.status(200).json(findPost) : res.status(404).json({ message: 'The post with the specified ID does not exist.' });
    }).catch(() => {
      res.status(500).json({ error: 'The post information could not be retrieved.' });
    });
});

blogPost.get('/posts/:id/comments', (req, res) => {
  const { id } = req.params;
  data.findCommentById(id)
    .then((findComment) => {
      // eslint-disable-next-line no-unused-expressions
      findComment[0] ? res.status(200).json(findComment) : res.status(404).json({ message: 'The post with the specified ID does not exist.' });
    }).catch(() => { res.status(500).json({ error: 'The comments information could not be retrieved.' }); });
});

blogPost.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  data.remove(id)
    .then((del) => {
      // eslint-disable-next-line no-unused-expressions
      del ? res.status(200).json(del) : res.status(404).json({ message: 'The post with the specified ID does not exist.' });
    }).catch((error) => {
      res.status(500).json(error);
    });
});

blogPost.put('/posts/:id', (req, res) => {
  const { id } = req.params;
  const updated = req.body;

  data.update(id, updated)
    .then((update) => {
      res.status(200).json(update);
    }).catch((error) => {
      res.status(500).json(error);
    });
});


module.exports = blogPost;
