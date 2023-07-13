const mongoose = require('mongoose')
const Comment = require('./comment')

const Schema = mongoose.Schema

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    published: { type: Boolean, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
  },
  { timestamps: true }
)

PostSchema.pre('remove', async function (next) {
  const post = this
  await Comment.deleteMany({ post: post._id })
  next()
})

module.exports = mongoose.model('Post', PostSchema)
