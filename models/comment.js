const { Schema, model } = require('mongoose');
const Populate = require('../util/autopopulate');

const commentSchema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  upVotes : [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downVotes : [{ type: Schema.Types.ObjectId, ref: 'User' }],
  voteScore: { type: Number },
}, { timestamps: true });

// Always populate the author field
commentSchema
  .pre('findOne', Populate('author'))
  .pre('find', Populate('author'))
  .pre('findOne', Populate('comments'))
  .pre('find', Populate('comments'));

module.exports = model('Comment', commentSchema);