const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    userName: {
      type: "string",
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    accountNumber: {
      type: "string",
      required: true,
    },
    emailAddress: {
      type: "string",
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    identityNumber: {
      type: "string",
      required: true,
    },
  },
  { timestamp: true }
);

module.exports = model("users", userSchema);
