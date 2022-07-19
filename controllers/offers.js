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

export {
  create
}