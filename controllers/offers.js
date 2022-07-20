import { Offer } from "../models/offer.js"

function create(req, res) {
  req.body.owner = req.user.profile
  Offer.create(req.body)
  .then(offer => {
    Offer.findById(offer._id)
    .populate("owner")
    .then(populatedOffer => {
      res.json(populatedOffer)
    })
  })
  .catch((err) => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function update(req, res) {
  Offer.findById(req.params.id)
  .then(offer => {
    if (offer.owner._id.equals(req.user.profile)) {
      Offer.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .populate("owner")
      .then(updatedOffer => {
        res.json(updatedOffer)
      })
    }
    else {
      res.status(401).json({err: "Not Authorized"})
    }
  })
  .catch((err) => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function deleteOne(req, res) {
  Offer.findById(req.params.id)
  .then(offer => {
    if (offer.owner._id.equals(req.user.profile)) {
      Offer.findByIdAndDelete(offer._id)
      .then(deletedOffer => {
        res.json(deletedOffer)
      })
    }
    else {
      res.status(401).json({err: "Not Authorized"})
    }
  })
  .catch((err) => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
  
}

function getPosts(req, res) {
  Offer.find({post: req.params.id})
  .populate("owner")
  .then(offers => {
    res.json(offers)
  })
  .catch((err) => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

export {
  create,
  update,
  deleteOne as delete,
  getPosts
}