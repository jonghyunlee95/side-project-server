const express = require('express');
const app = express();

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

app.listen(3000, () => {
  console.log('on');
});
