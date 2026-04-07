import mongoose, { Document } from "mongoose";
export interface IContent extends Document {
    title: string;
    type: "note" | "link" | "pdf" | "image";
    url?: string;
    fileUrl?: string;
    extractedText?: string;
    userId: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
declare const ContentModel: mongoose.Model<IContent, {}, {}, {}, mongoose.Document<unknown, {}, IContent, {}, {}> & IContent & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default ContentModel;
//# sourceMappingURL=ContentModel.d.ts.map