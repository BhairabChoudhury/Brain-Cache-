import { Request, Response } from "express";
export declare const createSession: (req: Request, res: Response) => Promise<void>;
export declare const getSessions: (req: Request, res: Response) => Promise<void>;
export declare const getSessionById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteSession: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const addMessageToSession: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=chatController.d.ts.map