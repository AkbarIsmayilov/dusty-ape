const functions = require("firebase-functions");
const app = require("express")();

const { getAllPosts, postOnePost } = require("./handlers/posts");
const { signup, login } = require("./handlers/users");
const FBAuth = require("./utils/fbAuth");

//posts routes
app.get("/posts", getAllPosts);
app.post("/post", FBAuth, postOnePost);

//users routes
app.post("/signup", signup);
app.post("/login", login);

exports.api = functions.region("europe-west2").https.onRequest(app);
