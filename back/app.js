const express = require('express');
// node 에서는 import 사용하지 않고 require 사용함. browser는 import 사용
const db = require('./models');
const app = express();

db.sequelize.sync();

// use는 middleware다.

// Json을 body 로 받을 수 있다.
app.use(express.json());
app.use(express.urlencoded({ extended: false}))

app.get('/', (req, res) => {
  res.send('Hi backend!');
  // res.status(200).send('Hi backend');
});

app.post('/user', async (req, res, next) => {
  try {
    console.log(req.body);
    console.log('hi');
    const newUser = await db.User.create({
      where: {
        email: req.body.email,
        password: req.body.password,
        nickname: req.body.nickname,
      },
    }); // HTTP Status code
    res.status(201).json(newUser); // 200은 성공, 201은 성공적으로 생성됨을 의미.
  } catch (err) {
    console.log(err);
    next(err);
  }
})

app.listen(3085, () => {
  console.log(`백엔드 서버 ${3085}번 포트에서 작동중.`);
});

