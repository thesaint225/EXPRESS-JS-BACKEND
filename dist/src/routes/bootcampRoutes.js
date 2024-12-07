"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bootcamps_1 = require("../controllers/bootcamps");
const router = (0, express_1.Router)();
// Fetch all bootcamps
router.get("/", bootcamps_1.getBootcamps);
// Fetch a single bootcamp by ID
router.get("/:id", bootcamps_1.getBootcamp);
// Create a new bootcamp
router.post("/", bootcamps_1.createBootcamp);
// Update a bootcamp by ID
router.put("/:id", bootcamps_1.updateBootcamp);
// Delete a bootcamp by ID
router.delete("/:id", bootcamps_1.deleteBootcamp);
exports.default = router;
