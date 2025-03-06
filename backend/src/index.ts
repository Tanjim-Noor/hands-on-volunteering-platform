import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Enable CORS – allow all origins or configure as needed
app.use(cors());

// Enable JSON body parsing
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express & TypeScript!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);