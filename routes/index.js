import express from "express";
import users from "../controller/user";

const router = express.Router();

router.post("/login/:userId", (req, res) => {
  console.log("hello ");
});

export default router;
