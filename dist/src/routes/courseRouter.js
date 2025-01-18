"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const courses_1 = require("../controllers/courses");
const router = (0, express_1.Router)({ mergeParams: true });
router.route("/").get(courses_1.getCourses);
exports.default = router;
