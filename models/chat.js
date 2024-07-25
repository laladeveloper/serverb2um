// - _id (ObjectId)
// - userId (ObjectId, references Users)
// - gameId (ObjectId, references Games)
// - messages (Array of Message objects)

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const chatSchema = new Schema({
  uid: {
    type: String,
    required: [true, "Please enter ID"],
  },
  userID: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  productID: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
  },
  messages: {
    type: String,
  },
});

const Chat = mongoose.model("Chat", CategorySchema);
export default Chat;
