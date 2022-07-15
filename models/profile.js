import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  content: String,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}
},
{
  timestamps: true
})

const profileSchema = new mongoose.Schema({
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