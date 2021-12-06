import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  username: {
    name: String
  },
  email: {
    type: String,
    index: {
      unique: true
    }
  },
  mobile: {
    type: Number
  },
  refercode: {
    type: String
  },
  waitlist: {
    type: Number
  },
  referralLink: {
    type: String
  },
  creationDate: {
    type: Number,
    default: Date.now()
  }
});

export default mongoose.model("users", userSchema);
