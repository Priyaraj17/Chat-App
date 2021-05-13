import express, { Router } from "express";

import user from "../controller/user";

const router = express.Router();

router
  .get("/", user.getAllUsers)
  .post("/", user.createUser)
  .get("/:id", user.getUser)
  .delete("/:id", user.deleteUser);

export default router;
