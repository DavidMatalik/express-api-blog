const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CommentSchema = new Schema(
  {
    text: { type: String, required: true },
    user: { type: String, required: true },
    email: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Comment', CommentSchema)
