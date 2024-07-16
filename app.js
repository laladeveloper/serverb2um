import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import productRoute from "./routes/product.js";
import userRoute from "./routes/user.js";
import reviewRoute from "./routes/review.js";
import categoryRoute from "./routes/category.js";

import { connectDB } from "./utils/features.js";

const app = express();
connectDB();
app.use(cookieParser());
app.use(express.json());

// app.use(cors());
// List of allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://b2um.com",
  "https://b2um.vercel.app",
  "https://serverb2um.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    // Check if the origin is in the allowedOrigins list
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true, // Allow credentials (cookies, authorization headers)
};

app.use(cors(corsOptions));

app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/category", categoryRoute);

// Serve static files
// app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => {
//   res.send("Saqlain your code is working");
// });
// app.get("/", (req, res) => {
//   res.sendFile(`index.html`);
// });
// for production mode from the server side 
app.use(express.static(path.join(__dirname, "./dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./dist/index.html"));
});
const port = process.env.PORT;
app.listen(port, function listening(req, res) {
  console.log(`Server is running on http://localhost:${port}`);
});
