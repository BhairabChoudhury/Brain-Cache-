interface CreateContentInput {
    title: string;
    type: "note" | "link" | "pdf" | "image";
    content?: string;
    url?: string;
    file?: any;
    userId: string;
}
export declare const createContent: (data: CreateContentInput) => Promise<import("mongoose").Document<unknown, {}, import("../Models/ContentModel").IContent, {}, {}> & import("../Models/ContentModel").IContent & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare const getAllContent: (userId: string) => Promise<(import("mongoose").Document<unknown, {}, import("../Models/ContentModel").IContent, {}, {}> & import("../Models/ContentModel").IContent & Required<{
    _id: unknown;
}> & {
    __v: number;
})[]>;
export declare const deleteContent: (id: string) => Promise<(import("mongoose").Document<unknown, {}, import("../Models/ContentModel").IContent, {}, {}> & import("../Models/ContentModel").IContent & Required<{
    _id: unknown;
}> & {
    __v: number;
}) | null>;
export {};
//# sourceMappingURL=contentservices.d.ts.map