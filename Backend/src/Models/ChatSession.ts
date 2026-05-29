import mongoose, { Schema, Document } from "mongoose";

export interface IMessage {
  sender: "user" | "ai";
  text: string;
  createdAt: Date;
}

export interface IChatSession extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  sender: { type: String, enum: ["user", "ai"], required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const ChatSessionSchema = new Schema<IChatSession>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true, default: "New Chat" },
  messages: [MessageSchema]
}, {
  timestamps: true
});

const ChatSessionModel = mongoose.model<IChatSession>("ChatSession", ChatSessionSchema);

export default ChatSessionModel;
