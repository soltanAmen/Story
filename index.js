import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bodyPasrser from "body-parser";
import e from "express";
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static("public"));
const port = 3000;
console.log(__dirname);
const key = "0";

app.use(bodyPasrser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render(__dirname + "/views/main.ejs");
});

app.get("/about", (req, res) => {
  res.render(__dirname + "/views/about.ejs");
});
let  posts = [
  {
    title: "post1",
    content: "content1",
    id: "p1",
  },
  {
    title: "post2",
    content: "content2",
    id: "p2",
  },
  {
    title: "post3",
    content: "content3",
    id: "p3",
  },
  {
    title: "post4",
    content: "content4",
    id: "p4",
  },
];
app.get("/login", (req, res) => {
  if (key == "0") {
    res.render(__dirname + "/views/login.ejs");
    key = "1";
  } else {
    res.redirect("/");
  }
});
app.get("/profile", (req, res) => { 
  res.render(__dirname + "/views/profile.ejs", {
    username: "username",
    email: "email",
    password: "password",
    tel: "tel",
    address: "address",
    posts: posts,
  });
});
app.post("/profile", (req, res) => {
  res.render(__dirname + "/views/profile.ejs", {
    username: req.body["username"],
    email: req.body.email,
    password: req.body.password,
    tel: req.body.tel,
    address: req.body.address,
    posts: posts,
  });
});
app.get("/profile/:id",(req,res)=>{
    let post=posts.find((post)=>post.id===req.params.id);
      res.render(__dirname + "/views/profile.ejs",post);
})


app.get("/create-post", (req, res) => {
  res.render(__dirname + "/views/create-post.ejs");
});

app.post("/submit/profile", (req, res) => {
  posts.push({
    title: req.body.title,
    content: req.body.content,
    id: "p" + req.body.title + (posts.length + 1),
  });
  console.log(posts);
  res.redirect("/profile");
  
});
app.get("/delete/:id", (req, res) => {
  posts = posts.filter((post) => post.id !== req.params.id);
  res.redirect("/profile");
});
app.get("/edit-post/:id", (req, res) => {
  let post = posts.find((post) => post.id === req.params.id);
  res.render(__dirname + "/views/edit-post.ejs", { post: post });
});
app.post("/profile/:id", (req, res) => {
  let post = posts.find((post) => post.id === req.params.id);
  post.title = req.body.title;
  post.content = req.body.content;
  res.redirect("/profile");
  console.log(posts);
});
app.post("/edit-post/:id", (req, res) => {
  let post = posts.find((post) => post.id === req.params.id);
  post.title = req.body.title;
  post.content = req.body.content;
  res.redirect("/profile");
});
app.get("/signup", (req, res) => {
  res.render(__dirname + "/views/signup.ejs");
});

app.listen(port, () => {
  console.log(`sever runing in port ${port}`);
});
/*app.use((req, res) => {
  res.status(404).sendFile(__dirname + "/views/404.html");
});
*/
