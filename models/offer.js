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
  owner: {type: Schema.Type.ObjectId, ref: "Profile"},
  post: {type: Schema.Type.ObjectId, ref: "Profile"}
},
{
  timestamps: true
})