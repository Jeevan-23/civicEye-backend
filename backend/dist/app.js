"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const citizen_routes_1 = __importDefault(require("./routes/citizen.routes"));
const issue_routes_1 = __importDefault(require("./routes/issue.routes"));
const app = (0, express_1.default)();
const normalizeOrigin = (origin) => origin.replace(/\/$/, "");
const allowedOrigins = [
    process.env.CLIENT_URL,
    process.env.CORS_ORIGIN,
    "https://civic-eye-frontend-sepia.vercel.app",
]
    .filter(Boolean)
    .map((origin) => normalizeOrigin(origin));
app.use((0, cors_1.default)({
    origin(origin, callback) {
        const normalizedOrigin = origin ? normalizeOrigin(origin) : "";
        const isLocalDevOrigin = !!origin && /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
        const isVercelPreview = !!origin && /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);
        if (!origin ||
            allowedOrigins.includes(normalizedOrigin) ||
            isLocalDevOrigin ||
            isVercelPreview) {
            callback(null, true);
            return;
        }
        callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
app.use((0, cookie_parser_1.default)());
// routes declaration
app.use("/api/v1", citizen_routes_1.default);
app.use("/api/v1", admin_routes_1.default);
app.use("/api/v1", issue_routes_1.default);
app.use("/api", (_req, res) => {
    res.status(404).json({ message: "API route not found" });
});
app.get('/', (req, res) => {
    res.send('Civic Issue Reporter Backend is Running');
});
exports.default = app;
