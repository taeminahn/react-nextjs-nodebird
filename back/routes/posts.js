const express = require('express');
const { Post } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /posts
  try{
    const posts = await Post.findAll({
      limit: 10,
      offset: 10, // 11~20dd
    });
    res.status(200).json(posts);
  }catch (error){
    console.error(error);
    next(error);
  }
});

module.exports = router;