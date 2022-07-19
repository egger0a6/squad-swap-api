import { Post } from "../models/post.js"
import { v2 as cloudinary } from "cloudinary"

function create(req, res) {
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

function update(req, res) {
  Post.findById(req.params.id)
  .then((post) => {
    if (post.owner._id.equals(req.user.profile)) {
      Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .populate("owner")
      .then((updatedPost) => {
        res.json(updatedPost)
      })
    }
    else {
      res.status(401).json({err: "Not authorized!"})
    }
  })
  .catch((err) => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function deleteOne(req, res) {
  Post.findById(req.params.id)
  .then(post => {
    if (post.owner._id.equals(req.user.profile)) {
      Post.findByIdAndDelete(post._id)
      .then(deletedPost => {
        res.json(deletedPost)
      })
    } else {
      res.status(401).json({err: "Not authorized!"})
    }
  })
  .catch((err) => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function addPhoto(req, res) {
  const imageFile = req.files.photo.path
  Post.findById(req.params.id)
  .then(post => {
    cloudinary.uploader.upload(imageFile, {tags: `${post.title}`})
    .then(image => {
      post.photo = image.url
      post.save()
      .then(post => {
        res.status(201).json(post.photo)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  })
}

export {
  create,
  index,
  update,
  deleteOne as delete,
  addPhoto
}