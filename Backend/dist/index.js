"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".ENV" });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./Config/db"));
const authroutes_1 = __importDefault(require("./routes/authroutes"));
const contentroutes_1 = __importDefault(require("./routes/contentroutes"));
const searchRoute_1 = __importDefault(require("./routes/searchRoute"));
const chatRoutes_1 = __importDefault(require("./routes/chatRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, db_1.default)();
console.log("App is running");
app.use("/api/auth/", authroutes_1.default);
app.use("/api/content/", contentroutes_1.default);
app.use("/api/search/", searchRoute_1.default);
app.use("/api/chat/", chatRoutes_1.default);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map