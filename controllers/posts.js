import { Post } from "../models/post.js"

function create(req, res) {
  console.log(req)
}

function index(req, res) {
  console.log(req)
  Post.find({})
  .populate("owner")
  .then((posts) => {
    res.json(posts)
  })
  .catch((err) => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

export {
  create,
  index
}