// backend/routes/testRoutes.js
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "API is working fine 🚀" });
});

export default router;
