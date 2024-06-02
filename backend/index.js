import express from "express";
import cors from "cors";
import connectToMongo from "./database/db.js";
import payment from "./routes/payment.js";

// Connect to MongoDB
connectToMongo();

// Initialize Express App
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Available Routes
app.get("/", (req, res) => {
  res.send("Razorpay Payment Gateway Using React And NodeJS");
});

// Payment Route
app.use("/api/payment", payment);

// Error Handling Middleware (optional)
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

// Start the Server
app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
