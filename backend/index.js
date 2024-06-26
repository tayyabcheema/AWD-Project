const express = require("express");
const app = express();
const cors = require("cors");
const connect = require("./config/connectDB");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;
const authRoutes = require("./routes/authRoutes");
const donorRoutes = require("./routes/donorRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const organizationRoutes = require("./routes/organizationRoutes");
dotenv.config();

app.use(cookieParser());
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173', // Your frontend origin
  credentials: true, // This is important to allow cookies to be sent from the frontend
};

app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/auth", donorRoutes);
app.use("/api/auth", hospitalRoutes);
app.use("/api/auth", organizationRoutes);

app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Something went wrong";
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    // stack: err.stack,
  });
});

app.listen(PORT, () => {
  connect();
  console.log(`Server is running on the port ${PORT}`);
});
