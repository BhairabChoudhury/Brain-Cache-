import mongoose from "mongoose";
declare const UserModel: mongoose.Model<{
    username: string;
    email: string;
    password: string;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    username: string;
    email: string;
    password: string;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    username: string;
    email: string;
    password: string;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    username: string;
    email: string;
    password: string;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    username: string;
    email: string;
    password: string;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    username: string;
    email: string;
    password: string;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default UserModel;
//# sourceMappingURL=UserModel.d.ts.map