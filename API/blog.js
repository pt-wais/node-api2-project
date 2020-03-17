const express = require('express');
const data = require('../data/db.js');
const blogPost = express.Router();

blogPost.get('/', (req, res) => {
 res.send(
  `
  <h1>Lambda Hubs API</h1>
  <p> Welcome</p>
  `
 )
})

blogPost.post('/posts', (req, res)=> {
const obj = req.body
data.insert(obj)
 .then(post => {
   res.status(200).json(post)
  })
  .catch(error => {
   res.status(500).json({
    errorMessage: 'sorry, we ran into an error'
   })
  })
})

blogPost.post('/posts/:id/comments', (req, res)=>{
 const obj = req.body

 data.insertComment(obj)
  .then(comment => {
   res.status(200).json(comment)
  })
  .catch(error => {
   res.status(500).json({
    errorMessage: 'more problems'
   })
  })
})


blogPost.get('/posts', (req, res)=> {
 data.find()
  .then(posts =>{
   res.status(200).json(posts)
  })
   .catch(error => {

    res.status(500).json({message: 'dead'})
   })
})

blogPost.get('/posts/:id', (req, res)=> {
 const {id} = req.params
 data.findById(id)
  .then(findPost => {
  
   res.status(200).json(findPost)
  }).catch(error => {

   res.status(500).json({message: 'not working yet'})
  })
})

blogPost.get('/posts/:id/comments', (req, res)=> {
 const {id} = req.params
 data.findCommentById(id)
  .then(findComment => {
   res.status(200).json(findComment)
  }).catch(error => {res.status(500).json({message: 'not working'})})
})

blogPost.delete('/posts/:id', (req, res)=> {
 const {id} = req.params
 data.remove(id)
  .then(del => {
   res.status(200).json(del)
  }).catch(error => {
   res.status(500).json(error)
  })
})

blogPost.put('/posts/:id', (req, res)=> {
 const {id} = req.params
 const updated = req.body

 data.update(id, updated)
  .then( update => {
   
   res.status(200).json(update)

  }).catch(error => {
   res.status(500).json(error)
  })
})


module.exports = blogPost;