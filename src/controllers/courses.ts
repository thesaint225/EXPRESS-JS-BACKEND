import { Request, Response, NextFunction, response } from "express";
import Courses from "../models/Courses";
import asyncHandler from "../middleware/async";
import ErrorResponse from "../utils/errorResponse";

// @description Get all courses
// @route GET /api/v1/courses
// @access public

export const getCourses = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let query;

    if (req.params.bootcampId) {
      query = Courses.find({ bootcamp: req.params.bootcampId });
    } else {
      query = Courses.find();
    }
    const courses = await query;
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  }
);
