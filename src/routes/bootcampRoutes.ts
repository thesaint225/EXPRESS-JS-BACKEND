import { Request, Response, NextFunction, Router } from "express";

import {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} from "../controllers/bootcamps";

const router: Router = Router();

// Fetch all bootcamps
router.get("/", getBootcamps);

// Fetch a single bootcamp by ID
// @ts-ignore
router.get("/:id", getBootcamp);

// Create a new bootcamp
router.post("/", createBootcamp);

// Update a bootcamp by ID
// @ts-ignore
router.put("/:id", updateBootcamp);

// Delete a bootcamp by ID
// @ts-ignore
router.delete("/:id", deleteBootcamp);

export default router;
