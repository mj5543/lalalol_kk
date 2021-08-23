const express = require('express');
const path = require('path');
const app = express()

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}
const userRouter = require('./routes/user.js')
const postsRouter = require('./routes/posts.js')
const adminRouter = require('./routes/admin.js')
app.get("/api/greeting", (req, res) => {
  res.send("Hello World!");
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