import { Request, Response, NextFunction, Router } from "express";

import {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  bootcampPhotoUpload,
} from "../controllers/bootcamps";

// Include other ressources routers

import courseRouter from "./courseRouter";

const router: Router = Router();

// Re-Route into other ressources routes
router.use("/:bootcampId/courses", courseRouter);

router.route("/:id/photo").put(bootcampPhotoUpload);

// Fetch all bootcamps
router.get("/", getBootcamps);

// Fetch a single bootcamp by ID
// @ts-ignore
router.get("/:id", getBootcamp);

// Create a new bootcamp
router.post("/", createBootcamp);

// Update a bootcamp by ID
router.put("/:id", updateBootcamp);

// Delete a bootcamp by ID
router.delete("/:id", deleteBootcamp);

export default router;
