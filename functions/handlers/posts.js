const { db } = require("../utils/admin");

exports.getAllPosts = (req, res) => {
  db.collection("posts")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let posts = [];
      data.forEach((doc) => {
        posts.push({
          postId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
        });
      });
      return res.json(posts);
    })
    .catch((err) => console.log(err));
};

exports.postOnePost = (req, res) => {
  const newPost = {
    userHandle: req.user.handle,
    createdAt: new Date().toISOString(),
    body: req.body.body,
  };
  db.collection("posts")
    .add(newPost)
    .then((data) => {
      res.json({
        message: `document ${data.id} has been created successfully`,
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "something went wrong" });
    });
};
