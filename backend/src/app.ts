// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import adminRoutes from "./routes/admin.routes";
// import citizenRoutes from "./routes/citizen.routes";
// import issueRoutes from "./routes/issue.routes";

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

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import adminRoutes from "./routes/admin.routes";
import citizenRoutes from "./routes/citizen.routes";
import issueRoutes from "./routes/issue.routes";
import { connectDB } from "./config/database";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://civic-eyee.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use(async (_req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("MongoDB connection failed for request:", error);
    res.status(503).json({ message: "Database connection failed" });
  }
});

// Routes
app.use("/api/v1", citizenRoutes);
app.use("/api/v1", adminRoutes);
app.use("/api/v1", issueRoutes);

app.use("/api", (_req, res) => {
  res.status(404).json({ message: "API route not found" });
});

app.get("/", (_req, res) => {
  res.send("Civic Issue Reporter Backend is Running");
});

export default app;
