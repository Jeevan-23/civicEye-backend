"use strict";
// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import adminRoutes from "./routes/admin.routes";
// import citizenRoutes from "./routes/citizen.routes";
// import issueRoutes from "./routes/issue.routes";
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
// const app = express();
// const normalizeOrigin = (origin: string) => origin.replace(/\/$/, "");
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://civic-eyee.vercel.app",
//     ],
//     credentials: true,
//   })
// );
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
// app.use(cookieParser());
// // routes declaration
// app.use("/api/v1", citizenRoutes);
// app.use("/api/v1", adminRoutes);
// app.use("/api/v1", issueRoutes);
// app.use("/api", (_req, res) => {
//   res.status(404).json({ message: "API route not found" });
// });
// app.get('/', (req, res) => {
//   res.send('Civic Issue Reporter Backend is Running');
// });
// export default app;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const citizen_routes_1 = __importDefault(require("./routes/citizen.routes"));
const issue_routes_1 = __importDefault(require("./routes/issue.routes"));
const database_1 = require("./config/database");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173",
        "https://civic-eyee.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
app.use((0, cookie_parser_1.default)());
app.use((_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.connectDB)();
        next();
    }
    catch (error) {
        console.error("MongoDB connection failed for request:", error);
        res.status(503).json({ message: "Database connection failed" });
    }
}));
// Routes
app.use("/api/v1", citizen_routes_1.default);
app.use("/api/v1", admin_routes_1.default);
app.use("/api/v1", issue_routes_1.default);
app.use("/api", (_req, res) => {
    res.status(404).json({ message: "API route not found" });
});
app.get("/", (_req, res) => {
    res.send("Civic Issue Reporter Backend is Running");
});
exports.default = app;
