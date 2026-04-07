import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // don't return password by default
    },

    credits: {
      type: Number,
      default: 5, // free credits on signup
    },

    subscription: {
      type: String,
      enum: ["free", "monthly", "quarterly"],
      default: "free",
    },

    resumes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resume",
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
