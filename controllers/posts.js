import { Post } from "../models/post.js"

function create(req, res) {
  console.log(req.body)
  req.body.owner = req.user.profile
  Post.create(req.body)
  .then(post => {
    Post.findById(post._id)
    .populate("owner")
    .then(populatedPost => {
      res.json(populatedPost)
    })
  })
  .catch((err) => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
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