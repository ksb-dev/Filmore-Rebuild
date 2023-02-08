const mongoose = require('mongoose')

const ShowSchema = new mongoose.Schema(
  {
    id: {
      type: Number
    },

    name: {
      type: String
    },

    poster_path: {
      type: String
    },

    backdrop_path: {
      type: String
    },

    first_air_date: {
      type: Number
    },

    release_date: {
      type: String
    },

    genre_ids: {
      type: Array
    },

    overview: {
      type: String
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }
  },

  { timestamps: true }
)

module.exports = mongoose.model('Show', ShowSchema)
