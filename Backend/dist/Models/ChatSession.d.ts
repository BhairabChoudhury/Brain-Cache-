import mongoose, { Document } from "mongoose";
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
declare const ChatSessionModel: mongoose.Model<IChatSession, {}, {}, {}, mongoose.Document<unknown, {}, IChatSession, {}, {}> & IChatSession & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default ChatSessionModel;
//# sourceMappingURL=ChatSession.d.ts.map