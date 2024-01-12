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
app.post('/db', function (req, res) {
  const title = req.body.title;
  db.push({
    id: db.length + 1,
    title,
  });

  res.send('값 추가 성공');
});
// 수정
app.put('/db', function (req, res) {
  const id = req.body.id;
  const title = req.body.title;

  db[id - 1].title = title;
  res.send('값 수정 성공');
});
// 삭제
app.delete('/db', function (req, res) {
  const id = req.body.id;

  db.splice(id - 1, 1);
  res.send('값 삭제 성공');
});
