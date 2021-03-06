import mongoose from "mongoose";

const Schema = mongoose.Schema

const postSchema = new Schema({
  photo: String,
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 100000
  },
  category: {
    type: String,
    required: true
  },
  description: String,
  condition: String,
  tags: [String],
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
  review: {type: Schema.Types.ObjectId, ref: "Review"},
  sold: {type: Boolean, default: false}
},
{
  timestamps: true
})

const Post = mongoose.model("Post", postSchema)

export { Post }