const Post = require('./models/post');

const express = require('express');
const app = express();

const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://admin:jonghyun95@hyunapi.9rpvhs3.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    app.listen(3000, () => {
      console.log('on');
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 글 목록 전체 조회
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 특정 글 조회
app.get('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 생성
app.post('/posts', async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 수정
app.put('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, req.body);

    if (!post) return res.status(404).json({ message: `cannot find ${id}` });

    const updatedPost = await Post.findById(id);
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 삭제
app.delete('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);

    if (!post) return res.status(404).json({ message: `cannot find ${id}` });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
