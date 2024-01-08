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

const db = [
  { id: 1, title: '글 1' },
  { id: 2, title: '글 2' },
  { id: 3, title: '글 3' },
];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 글 목록 전체 조회
app.get('/db', function (req, res) {
  res.send(db);
});
// 특정 글 조회
app.get('/db/:id', function (req, res) {
  const id = req.params.id;
  const data = db.find((el) => el.id === Number(id));
  res.send(data);
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
