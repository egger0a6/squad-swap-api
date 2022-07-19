import mongoose from "mongoose";

const Schema = mongoose.Schema

const offerSchema = new Schema({
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 100000
  },
  comment: String,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
  post: {type: Schema.Types.ObjectId, ref: "Profile"}
},
{
  timestamps: true
})

const Offer = mongoose.model("Offer", offerSchema)

export { Offer }