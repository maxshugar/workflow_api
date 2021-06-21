const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    ownerId: {
      type: String,
      required: true,
    },
    collaboratorIds: [
      {
        type: Schema.Types.ObjectId,
        required: false,
      },
    ],
    gitRepoUri: {
      type: String,
      required: false,
    },
    elements: [
      {
      type: Object,
      required: false
      }
    ],
    deletedAt: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("Project", projectSchema);

module.exports = User;
