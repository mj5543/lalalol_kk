const express = require('express');
const path = require('path');
const app = express()
require('dotenv').config();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}
const userRouter = require('./routes/user.js')
const postsRouter = require('./routes/posts.js')
const adminRouter = require('./routes/admin.js')
app.get("/api/fileconfig", (req, res) => {
  const config = {
    bucketName: process.env.S3_BUCKET_NAME,
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
  res.send(config);
});

app.use(userRouter);
app.use(postsRouter);
app.use(adminRouter);
// app.render()
// app.get('/user/:id', (req, res) => {
//   return app.render(req, res, '/user', { id: req.params.id });
// });
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/build", "index.html"));
// });
app.get('*', (req, res)=> {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});
const PORT = process.env.PORT || 5000;
// console.log('process.env.NODE_ENV---', process.env.NODE_ENV);
// console.log('process.env---', process.env);

app.listen(PORT);