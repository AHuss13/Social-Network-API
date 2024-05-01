const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');

const thoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt:{
            type: Date,
            default: Date.now,
        },
        userid:{
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
      },
);

const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
      },
    },
    {
      toJSON: {
        getters: true,
      },
      _id: false,
    }
  );

thoughtSchema.virtual('reactionsCount').get( function(){
    return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema);
module.exports = Thought;