import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import productRoute from "./routes/product.js";
import userRoute from "./routes/user.js";
import reviewRoute from "./routes/review.js";
import categoryRoute from "./routes/category.js";
import orderRoute from "./routes/order.js";
import paymentRoute from "./routes/payment.js";


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

// app.use(cors(corsOptions));
app.use(cors())
// app.use(cors({
//   origin: 'http://localhost:5173', // Replace with your frontend URL
// }));
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/category", categoryRoute);
app.use("/api/order", orderRoute);
app.use("/api/payment", paymentRoute);

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, "./public")));

app.get("/",(req,res)=>{
  res.sendFile(path.resolve(__dirname, "./public/index.html"))
})

// app.get("/uid", (req,res)=>{
//   function generateUniqueId() {
//     // Define the characters you want to include in the ID
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let uniqueId = 'B2';
  
//     // Generate 4 additional random characters (since 'B2' is already 2 characters)
//     for (let i = 0; i < 4; i++) {
//       const randomIndex = crypto.randomInt(0, characters.length);
//       uniqueId += characters[randomIndex];
//     }
  
//     return uniqueId;
//   }
  
//   // Example usage
//   const uid = generateUniqueId();
//   res.status(201).json({
//     success:true,
//     uid
//   })
// });
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./dist/index.html"));
// });
const port = process.env.PORT;
app.listen(port, function listening(req, res) {
  console.log(`Server is running on http://localhost:${port}`);
});
