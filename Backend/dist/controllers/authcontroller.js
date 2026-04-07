"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const UserModel_1 = __importDefault(require("../Models/UserModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_TOKEN = process.env.JWT_TOKEN;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hi i am here ghgf ");
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ "message": "All fields required" });
        }
        const user = yield UserModel_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({ "message": "User already exist" });
        }
        const hashpassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = UserModel_1.default.create({
            username,
            email,
            password: hashpassword
        });
        return res.status(201).json({ "message": "User created successfully" });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ "message": "Internal Server Error " });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ "message": " All fields required" });
        }
        const user = yield UserModel_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_TOKEN, { expiresIn: "7d" });
        res.json({ token });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ "message": "signin failed " });
    }
});
exports.signin = signin;
//# sourceMappingURL=authcontroller.js.map