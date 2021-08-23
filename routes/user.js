const express = require('express')
const router = express.Router()
// const fs = require('fs')
// const ejs = require('ejs')
const connection = require('../db');
const crypto = require('crypto');

router.use(express.json()); 
router.use(express.urlencoded({ extended: false }))
router.post('/api/userCheck', function(request, response) {
  console.log('request.body', request.body);
  console.log('rresponse', response);
  const username = request.body.name;
  const email = request.body.email;
  connection.query('SELECT * FROM users WHERE username = ? AND email = ?', [username, email], function(error, results, fields) {
    if (error) {
      response.status(500);
      response.render('error', { error: err });
    } else {
      response.send({ result : results });
    }
  });
});
router.post('/api/userEmailPassCheck', function(request, response) {
  console.log('request.body', request.body);
  console.log('rresponse', response);
  const userpassword = request.body.password;
  const email = request.body.email;
  connection.query('SELECT * FROM users WHERE password = ? AND email = ?', [userpassword, email], function(error, results, fields) {
    if (error) {
      response.status(500);
      response.render('error', { error: err });
    } else {
      response.send({ result : results });
    }
  });

  // const salt = crypto.randomBytes(32).toString('base64');
  // console.log('salt :: ', salt);
  // crypto.randomBytes(64, (err, buf) => {
  //   //salt는 생성하는 해시값 이외에 추가적인 암호화 값
  //     const salt = buf.toString('base64');
  //     console.log('salt :: ', salt);
  //     //crypto.pbkdf2의 salt 뒤 숫자 파라미터는 임의의 값으로 주어준다.
  //     crypto.pbkdf2(userpassword, salt, 1203947, 64, 'sha512', (err, key) => {
  //         console.log('password :: ', key.toString('base64')); 
  //         connection.query('SELECT * FROM users WHERE password = ? AND email = ?', [userpassword, email], function(error, results, fields) {
  //           if (error) {
  //             response.status(500);
  //             response.render('error', { error: err });
  //           } else {
  //             response.send({ result : results });
  //           }
  //         });
  //     });
  // });
});
router.post('/api/user-password-change', function(request, response) {
  console.log('request.body', request.body);
  console.log('rresponse', response);
  const userpassword = request.body.password;
  const email = request.body.email;
  connection.query('UPDATE users SET password = ?, password_s = ? WHERE email = ?', [userpassword, userpassword, email],
  function(error, results, fields) {
    if (error) {
      response.status(500);
      response.render('error', { error: err });
    } else {
      response.send({ result : results });
    }
  });

  // crypto.randomBytes(64, (err, buf) => {
  //     const salt = buf.toString('base64');
  //     console.log('salt :: ', salt);
  //     crypto.pbkdf2(userpassword, salt, 1203947, 64, 'sha512', (err, key) => {
  //         console.log('password :: ', key.toString('base64')); // 'dWhPkH6c4X1Y71A/DrAHhML3DyKQdEkUOIaSmYCI7xZkD5bLZhPF0dOSs2YZA/Y4B8XNfWd3DHIqR5234RtHzw=='
  //         connection.query('UPDATE users SET password = ?, password_s = ? WHERE email = ?', [key.toString('base64'), salt, email],
  //         function(error, results, fields) {
  //           if (error) {
  //             response.status(500);
  //             response.render('error', { error: err });
  //           } else {
  //             response.send({ result : results });
  //           }
  //         });
  //     });
  //   });
});
router.post('/api/updateLoggedinUser', function(request, response) {
  // const {name, password, email, appId, provider} = request.body;
  const email = request.body.email;
  const imageUrl = request.body.imageUrl;
  const ip = request.body.ip;
  const params = [imageUrl, ip, email];
  connection.query('UPDATE users SET app_image_url = ?, update_ip = ? WHERE email = ?', params,
   (err, results) => {
    if (err) {
      console.error('Error code : ' + err.code);
      console.error('Error Message : ' + err.message);
      throw new Error(err); 
    } else { 
      response.send('success'); 
      response.end();
    }
  });

});
router.post('/api/userEmailCheck', function(request, response) {
  console.log('request.body', request.body);
  const email = request.body.email;
  connection.query('SELECT * FROM users WHERE email = ?', [email], function(error, results, fields) {
    console.log('error, results', error, results);
    if (error) {
      response.status(500);
      response.render('error', { error: error });
      response.send({ error : error });
    } else {
      response.send({ result : results });
    }
  });
});
router.post('/api/login', function(request, response) {
  console.log('request.body', request.body);
  const username = request.body.username;
  const password = request.body.password;
  if (username && password) {
      connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
          if (error) throw error;
          if (results.length > 0) {
              request.session.loggedin = true;
              request.session.username = username;
              response.redirect('/');
              response.end();
          } else {              
              response.send('<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); document.location.href="/login";</script>');    
          }            
      });
  } else {        
      response.send('<script type="text/javascript">alert("username과 password를 입력하세요!"); document.location.href="/login";</script>');    
      response.end();
  }
});
router.get('/api/logout', function(request, response) {
  request.session.loggedin = false;
  response.send('<script type="text/javascript">alert("성공적으로 로그아웃 되었습니다."); document.location.href="/";</script>');    
  response.end();
});
router.post('/api/signup', function(request, response) {
  // const {name, password, email, appId, provider} = request.body;
  const name = request.body.name;
  const password = request.body.password;
  const appId = request.body.appId;
  const email = request.body.email;
  const provider = request.body.provider;
  const ip = request.body.ip;
  const params = [name, password, email, appId, provider, ip, ip];
  console.log('/api/signup--', name, password, email, appId, provider);
  connection.query('INSERT INTO users (username, password, email, app_id, provided_app, create_ip) VALUES (?,?,?,?,?,?)', params,
   (err, results) => {
    if (err) {
      console.error('Error code : ' + err.code);
      console.error('Error Message : ' + err.message);
      throw new Error(err); 
    } else { 
      response.send('success'); 
      response.end();
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
      connection.query('SELECT * FROM users WHERE username = ? AND password = ? AND email = ?', [username, password, email], function(error, results, fields) {
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
router.get('/api/users', (req, res) => {
  connection.query("SELECT * FROM users", (err, data) => {

    if (err) {
      res.send({ error : err });
    } else {
      res.send({ result : data });
    }
 
  })
})
module.exports = router