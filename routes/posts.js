const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path');
// const ejs = require('ejs')
// const bodyParser  = require('body-parser');
const connection = require('../db');
const bcrypt = require('bcrypt');
const saltRound = 10;
const multer = require('multer');	//파일업로드를 위한 node 미들웨어
const upload = multer({ dest: './client/public/uploads' });	//실제 사진은 서버 ./upload폴더에 저장
//db에는 실제 이미지를 올리는 것이 아닌 서버에서의 해당 파일 경로를 string(varchar)타입으로 저장할 것
// /image/${filename}꼴로 db에 저장하고, 
// 서버에서 다시 SELECT 등으로 가져올 땐 image폴더 대신 upload폴더에서 가져오도록 함
router.use(express.static('./client/public/uploads'));
router.use(express.json()); 
router.use(express.urlencoded({ extended: false }))
fs.readdir('./client/public/uploads', (error) => {
  // uploads 폴더 없으면 생성
  if (error) {
      fs.mkdirSync('./client/public/uploads');
  }
})

router.post('/api/posts/regist', function(request, response) {
  console.log('params', request.params);
  console.log('query', request.query);
  const data = request.body;
  // bcrypt.genSalt(saltRound, (err, salt) => {
  //   if (err) throw new Error(err);
  //   bcrypt.hash(data.password, salt, (err, hash) => {
  //     if (err) throw new Error(err); // 입력 구문
  //     let now = new Date();
  //     let sql = 'INSERT INTO posts (name, email, password, subject, content, ip, created_at) VALUES (?, ?, ?, ?, ?, inet_aton(?), ?)';
  //     let bindParam = [
  //       data.name, 
  //       data.email,
  //       hash, // 해싱된 비밀번호
  //       data.subject,
  //       data.content,
  //       data.ip,
  //       now
  //     ];
  //     connection.query(sql, bindParam, (err, results, fields) => {
  //       if (err) {
  //         console.error('Error code : ' + err.code);
  //         console.error('Error Message : ' + err.message);
  //         throw new Error(err); 
  //       } else { 
  //         response.send(JSON.parse(JSON.stringify(results))); 
  //       }
  //     });
  //     /** * 위 코드에서 result 의 값으로 넘어오는 것들 * * fieldCount: 0, * affectedRows: 1, // 성공한 개수 * insertId: 2, * serverStatus: 2, * warningCount: 0, * message: '', * protocol41: true, * changedRows: 0 */ 
  //   });
  // });
  let now = new Date();
  // let sql = 'INSERT INTO posts (name, email, password, subject, content, ip, created_at) VALUES (?, ?, ?, ?, ?, inet_aton(?), ?)';
  let sql = 'INSERT INTO posts (name, email, password, subject, content, created_at, group_type, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const content = `${data.content}`;
  const bindParam = [
    data.name, 
    data.email,
    data.password,
    data.subject,
    content,
    now,
    data.groupType,
    data.image
  ];
  // const content = `<p style="text-align:start;"><span style="color: rgb(81,81,81);background-color: rgb(255,255,255);font-size: 16px;font-family: Noto Sans KR", "PT Serif", Georgia, "Times New Roman", serif;">axios에서 
  // 추가 데이터를 보내는 방법에는 data와 params가 있다. data는 post요청을 보낼 때 사용되는 객체이며, params는 위의 예시처럼 url에 포함되는 데이터를 넣어주는 것이다.</span> <span style="color: rgb(81,81,81);background-color: rgb(255,255,255);font-size: 16px;font-family: Noto Sans KR", "PT Serif", Georgia, "Times New Roman", serif;"><strong>주의해야 할 점은, 서버에서는 req.params를 사용하면 예상된 변수(?)값을 받아오는 의미이지만, axios에 
  // 서는 params가 ?뒤에오는 쿼리문을 뜻한다. 헷갈리지 말자!</strong></span></p>\n' +
  // [0]       '<p style="text-align:start;"><span style="color: rgb(81,81,81);background-color: rgb(255,255,255);font-size: 16px;font-family: Noto Sans KR", "PT Serif", Georgia, "Times New Roman", serif;">추가적으로 XML, JSON, Multi Form등을 사용해야 할 때는 post 요청을 보낼 때다. delete, get을 사용할 때는, data로 넘기지말고 params로 간단히 id를 넘겨야 한다.</span>&nbsp;</p>\n`;
  // const bindParam = ['운영자', 'test@mail', '1111', 'test insert', content, '2021-07-21T07:01:43']
  connection.query(sql, bindParam, (err, results, fields) => {
    if (err) {
      res.status(500);
      res.render('error', { error: err });
      res.send({ error : err });
      throw new Error(err); 
    } else { 
      response.send(JSON.parse(JSON.stringify(results))); 
    }
  });
});
// const upload = multer({
//   storage: multer.diskStorage({
//       destination(req, file, cb) {
//           cb(null, 'uploads/');
//       },
//       filename(req, file, cb) {
//           const ext = path.extname(file.originalname);
//           cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
//       },
//   }),
//   limits: { fileSize: 5 * 1024 * 1024 },
// })
router.post('/api/posts/update', upload.single('file'), function(request, response) {
  console.log('params', request.params);
  console.log('query', request.query);
  const data = request.body;
  // bcrypt.genSalt(saltRound, (err, salt) => {
  //   if (err) throw new Error(err);
  //   bcrypt.hash(data.password, salt, (err, hash) => {
  //     if (err) throw new Error(err); // 입력 구문
  //     let now = new Date();
  //     let sql = 'INSERT INTO posts (name, email, password, subject, content, ip, created_at) VALUES (?, ?, ?, ?, ?, inet_aton(?), ?)';
  //     let bindParam = [
  //       data.name, 
  //       data.email,
  //       hash, // 해싱된 비밀번호
  //       data.subject,
  //       data.content,
  //       data.ip,
  //       now
  //     ];
  //     connection.query(sql, bindParam, (err, results, fields) => {
  //       if (err) {
  //         console.error('Error code : ' + err.code);
  //         console.error('Error Message : ' + err.message);
  //         throw new Error(err); 
  //       } else { 
  //         response.send(JSON.parse(JSON.stringify(results))); 
  //       }
  //     });
  //     /** * 위 코드에서 result 의 값으로 넘어오는 것들 * * fieldCount: 0, * affectedRows: 1, // 성공한 개수 * insertId: 2, * serverStatus: 2, * warningCount: 0, * message: '', * protocol41: true, * changedRows: 0 */ 
  //   });
  // });
  let now = new Date();
  // let sql = 'INSERT INTO posts (name, email, password, subject, content, ip, created_at) VALUES (?, ?, ?, ?, ?, inet_aton(?), ?)';
  let sql = 'UPDATE posts SET email = ?, name = ?, subject =?, content = ?, updated_at = ?, ip = ?, image = ? WHERE id = ?';
  const content = `${data.content}`;
  // let image = null;
  // console.log('request.file', request.file);
  // if(request.file) {
  //   image = `${request.file.filename}`;
  // }
  // if(data.file) {
  //   image = `/image/${request.file.filename}`;
  // }
  const bindParam = [
    data.email,
    data.name,
    data.title,
    content,
    now,
    data.ip,
    data.image,
    data.id,
  ];
  console.log('bindParam', bindParam);
  // const content = `<p style="text-align:start;"><span style="color: rgb(81,81,81);background-color: rgb(255,255,255);font-size: 16px;font-family: Noto Sans KR", "PT Serif", Georgia, "Times New Roman", serif;">axios에서 
  // 추가 데이터를 보내는 방법에는 data와 params가 있다. data는 post요청을 보낼 때 사용되는 객체이며, params는 위의 예시처럼 url에 포함되는 데이터를 넣어주는 것이다.</span> <span style="color: rgb(81,81,81);background-color: rgb(255,255,255);font-size: 16px;font-family: Noto Sans KR", "PT Serif", Georgia, "Times New Roman", serif;"><strong>주의해야 할 점은, 서버에서는 req.params를 사용하면 예상된 변수(?)값을 받아오는 의미이지만, axios에 
  // 서는 params가 ?뒤에오는 쿼리문을 뜻한다. 헷갈리지 말자!</strong></span></p>\n' +
  // [0]       '<p style="text-align:start;"><span style="color: rgb(81,81,81);background-color: rgb(255,255,255);font-size: 16px;font-family: Noto Sans KR", "PT Serif", Georgia, "Times New Roman", serif;">추가적으로 XML, JSON, Multi Form등을 사용해야 할 때는 post 요청을 보낼 때다. delete, get을 사용할 때는, data로 넘기지말고 params로 간단히 id를 넘겨야 한다.</span>&nbsp;</p>\n`;
  // const bindParam = ['운영자', 'test@mail', '1111', 'test insert', content, '2021-07-21T07:01:43']
  connection.query(sql, bindParam, (err, results, fields) => {
    if (err) {
      response.status(500);
      response.render('error', { error: err });
      response.send({ error : err });
      throw new Error(err); 
    } else { 
      console.log('results--', results)
      response.send(JSON.parse(JSON.stringify(results))); 
    }
  });
});
router.get('/api/posts/list', function(request, response) {
  // let sql = 'SELECT * FROM posts ORDER BY id DESC LIMIT 10';
  let sql = 'SELECT * FROM posts ORDER BY id DESC';
  connection.query(sql, (err, data, fields) => {
    if (err) { 
      res.status(500);
      res.render('error', { error: err });
      res.send({ error : err });
      throw new Error(err);
    } else {
      response.send({ result : data });
      // response.send(JSON.parse(JSON.stringify(results))); 
    } 
  });

});
router.get('/api/posts/list-members-preview', function(request, response) {
  // let sql = 'SELECT * FROM posts ORDER BY id DESC LIMIT 10';
  let sql = 'SELECT * FROM posts WHERE group_type NOT IN (?,?) ORDER BY id DESC LIMIT 12';
  connection.query(sql, ['GALLERY', 'MASTER'], (err, data, fields) => {
    if (err) { 
      res.status(500);
      res.render('error', { error: err });
      res.send({ error : err });
      throw new Error(err);
    } else {
      response.send({ result : data });
      // response.send(JSON.parse(JSON.stringify(results))); 
    } 
  });

});
router.get('/api/posts/list-preview', function(request, response) {
  // let sql = 'SELECT * FROM posts ORDER BY id DESC LIMIT 10';
  let sql = 'SELECT * FROM posts WHERE group_type NOT IN (?, ?) ORDER BY id DESC LIMIT 12';
  connection.query(sql, ['MASTER', 'GALLERY'], (err, data, fields) => {
    if (err) { 
      response.status(500);
      response.render('error', { error: err });
      response.send({ error : err });
      throw new Error(err);
    } else {
      response.send({ result : data });
      // response.send(JSON.parse(JSON.stringify(results))); 
    } 
  });

});
router.get('/api/posts/activities', function(request, response) {
  // let sql = 'SELECT * FROM posts ORDER BY id DESC LIMIT 10';
  let sql = 'SELECT name,pp.email,pp.subject,pp.created_at,(select app_image_url from users as u where u.email = pp.email COLLATE utf8mb4_0900_ai_ci) as user_image from posts as pp ORDER BY id DESC  LIMIT 12';
  connection.query(sql, (err, data, fields) => {
    if (err) { 
      response.status(500);
      response.render('error', { error: err });
      response.send({ error : err });
      throw new Error(err);
    } else {
      response.send({ result : data });
      // response.send(JSON.parse(JSON.stringify(results))); 
    } 
  });

});
router.post('/register', function(request, response) {
  const username = request.body.username;
  const password = request.body.password;
  const password2 = request.body.password2;
  const email = request.body.email;
  console.log(username, password, email);
  if (username && password && email) {
      connection.query('SELECT * FROM user WHERE username = ? AND password = ? AND email = ?', [username, password, email], function(error, results, fields) {
          if (error) throw error;
          if (results.length <= 0 && password==password2) {
              connection.query('INSERT INTO user (username, password, email) VALUES(?,?,?)', [username, password, email],
              function (error, data) {
                  if (error)
                  console.log(error);
                  else
                  console.log(data);
              });
                response.send('<script type="text/javascript">alert("회원가입을 환영합니다!"); document.location.href="/";</script>');    
          } else if(password!=password2){                
              response.send('<script type="text/javascript">alert("입력된 비밀번호가 서로 다릅니다."); document.location.href="/register";</script>');    
          }
          else {
              response.send('<script type="text/javascript">alert("이미 존재하는 아이디 입니다."); document.location.href="/register";</script>');    
          }            
          response.end();
      });
  } else {
      response.send('<script type="text/javascript">alert("모든 정보를 입력하세요"); document.location.href="/register";</script>');    
      response.end();
  }
});
router.get('/api/posts/detail', (req, res) => {
  console.log('params', req.params);
  console.log('query', req.query);
  connection.query("SELECT * FROM posts WHERE id = ?", [req.query.id], (err, data) => {

    if (err) {
      res.status(500);
      res.render('error', { error: err });
      res.send({ error : err });
    } else {
      res.send({ result : data });
    }
 
  })
})
router.get('/api/posts/comment-list', (req, res) => {
  const sql = 'select *, (select username from users where id = pp.writer_id) as userName, (select app_image_url from users where id = pp.writer_id) as userImage from post_comment pp where post_id = ?'
  connection.query(sql, [req.query.id], (err, data) => {
    if (err) {
      res.status(500);
      res.render('error', { error: err });
      res.send({ error : err });
    } else {
      res.send({ result : data });
    }
 
  })
});
router.post('/api/posts/comment-regist', function(request, response) {
  console.log('params', request.params);
  console.log('query', request.query);
  const data = request.body;
  let sql = 'INSERT INTO post_comment (post_id, writer_id, content, created_at, ip) VALUES (?, ?, ?, ?, ?)';
  const content = `${data.content}`;
  const bindParam = [
    data.postId,
    data.userId,
    content,
    data.now,
    data.ip,
  ];
  const commentCntSql = 'UPDATE posts SET comment_cnt = comment_cnt+1 where id = ?'
  connection.query(sql, bindParam, (err, results, fields) => {
    if (err) {
      res.status(500);
      res.render('error', { error: err });
      res.send({ error : err });
      throw new Error(err); 
    } else { 
      connection.query(commentCntSql, [data.postId], (err, results, fields) => {
        if (err) {
          res.status(500);
          res.render('error', { error: err });
          res.send({ error : err });
          throw new Error(err); 
        } else { 
          response.send(JSON.parse(JSON.stringify(results))); 
        }
      });    
      response.send(JSON.parse(JSON.stringify(results))); 
    }
  });
});


router.delete('/api/posts/delete', (req, res) => {
  console.log('params', req.params);
  console.log('query', req.query);
  connection.query("DELETE FROM posts WHERE id = ?", [req.query.id], (err, data) => {

    if (err) {
      res.status(500);
      res.render('error', { error: err });
      res.send({ error : err });
    } else {
      res.send({ result : data });
    }
 
  })
})
router.get('/api/posts/category-list', (req, res) => {
  console.log('params', req.params);
  console.log('query', req.query);
  connection.query("SELECT * FROM posts WHERE group_type = ? ORDER BY id DESC", [req.query.groupType], (err, data) => {
    console.log('data-', data);

    if (err) {
      res.status(500);
      res.render('error', { error: err });
      res.send({ error : err });
    } else {
      res.send({ result : data });
    }
 
  })
})
module.exports = router