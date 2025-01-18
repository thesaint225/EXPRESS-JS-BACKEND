"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bootcamps_1 = require("../controllers/bootcamps");
// Include other ressources routers
const courseRouter_1 = __importDefault(require("./courseRouter"));
const router = (0, express_1.Router)();
// Re-Route into other ressources routes
router.use("/:bootcampId/courses", courseRouter_1.default);
// Fetch all bootcamps
router.get("/", bootcamps_1.getBootcamps);
// Fetch a single bootcamp by ID
// @ts-ignore
router.get("/:id", bootcamps_1.getBootcamp);
// Create a new bootcamp
router.post("/", bootcamps_1.createBootcamp);
// Update a bootcamp by ID
// @ts-ignore
router.put("/:id", bootcamps_1.updateBootcamp);
// Delete a bootcamp by ID
// @ts-ignore
router.delete("/:id", bootcamps_1.deleteBootcamp);
exports.default = router;
