const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = express();

// routes
const authRoutes = require("./routes/authRoute");
const postRoutes = require("./routes/postRoute");
const followerRoutes = require("./routes/followerRoutes");

//env variables
dotenv.config();

//connect DB
connectDB();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/follow", followerRoutes);

// start server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server connected to PORT ${PORT} ✅`));
