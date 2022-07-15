import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: String,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}
},
{
  timestamps: true
})

const profileSchema = new Schema({
  email: { type: String, required: true, lowercase: true, unique: true },
  name: String,
  friends: [{type: Schema.Types.ObjectId, ref: "Profile"}],
  comments: [commentSchema]
},
{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }