import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/admin.routes";
import citizenRoutes from "./routes/citizen.routes";
import issueRoutes from "./routes/issue.routes";

const app = express();

const normalizeOrigin = (origin: string) => origin.replace(/\/$/, "");

const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.CORS_ORIGIN,
  "https://civic-eye-frontend-sepia.vercel.app",
]
  .filter(Boolean)
  .map((origin) => normalizeOrigin(origin as string));

app.use(cors({
  origin(origin, callback) {
    const normalizedOrigin = origin ? normalizeOrigin(origin) : "";
    const isLocalDevOrigin =
      !!origin && /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
    const isVercelPreview =
      !!origin && /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);

    if (
      !origin ||
      allowedOrigins.includes(normalizedOrigin) ||
      isLocalDevOrigin ||
      isVercelPreview
    ) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked origin: ${origin}`));
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());


// routes declaration

app.use("/api/v1", citizenRoutes);
app.use("/api/v1", adminRoutes);
app.use("/api/v1", issueRoutes);
app.use("/api", (_req, res) => {
  res.status(404).json({ message: "API route not found" });
});
app.get('/', (req, res) => {
  res.send('Civic Issue Reporter Backend is Running');
});


export default app;
