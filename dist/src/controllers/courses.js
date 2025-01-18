"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourses = void 0;
const Courses_1 = __importDefault(require("../models/Courses"));
const async_1 = __importDefault(require("../middleware/async"));
// @description Get all courses
// @route GET /api/v1/courses
// @access public
exports.getCourses = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let query;
    if (req.params.bootcampId) {
        query = Courses_1.default.find({ bootcamp: req.params.bootcampId });
    }
    else {
        query = Courses_1.default.find().populate({
            path: "bootcamp ",
            select: "name description",
        });
    }
    const courses = yield query;
    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses,
    });
}));
