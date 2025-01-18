import { Request, Response, NextFunction, response } from "express";
import Courses from "../models/Courses";
import asyncHandler from "../middleware/async";
import ErrorResponse from "../utils/errorResponse";
import Bootcamp from "../models/Bootcamp";

// @description Get all courses
// @route GET /api/v1/courses
// @route GET /api/v1/bootcamp/:bootcampId/Course

// @access public

export const getCourses = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let query;

    if (req.params.bootcampId) {
      query = Courses.find({ bootcamp: req.params.bootcampId });
    } else {
      query = Courses.find().populate({
        path: "bootcamp",
        select: "name description",
      });
    }
    const courses = await query;
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  }
);

// @description Get single courses
// @route GET /api/v1/courses/:id

// @access public
export const getCourse = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const course = await Courses.findById(req.params.id).populate({
      path: "bootcamp",
      select: "name description",
    });

    if (!course) {
      return next(
        new ErrorResponse(`No course with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  }
);

// @description Add  course
// @route POST /api/v1/bootcamps/:bootcampId/courses

// @access private
export const addCourse = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    req.body.bootcamp = req.params.bootcampId;

    const bootcamp = await Bootcamp.findById(req.params.bootcampId);

    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `No bootcamp with id of ${req.params.bootcampId}`,
          404
        )
      );
    }

    const course = await Courses.create(req.body);

    res.status(200).json({
      success: true,
      data: course,
    });
  }
);

// @description        Update  course
// @route              PUT /api/v1/courses/:id

// @access private
export const updateCourse = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const update = req.body;
    // Debugging input
    console.log("ID:", id);
    console.log("Update:", update);

    // Validate that `id` and `update` are provided
    if (!id || !update) {
      return next(
        new ErrorResponse("Course ID and update data are required", 400)
      );
    }

    // Update the course and return the new document
    const course = await Courses.findByIdAndUpdate(id, update, {
      new: true, // Return the updated course
      runValidators: true, // Run validation on the update data
    });

    // If course doesn't exist, return a 404 error
    if (!course) {
      return next(new ErrorResponse(`No course with ID ${id}`, 404));
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  }
);
// @description        Delete  course
// @route              DELETE /api/v1/courses/:id

// @access private
export const deleteCourse = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const update = req.body;
    // Debugging input
    console.log("ID:", id);

    // Validate that `id` and `update` are provided
    if (!id) {
      return next(new ErrorResponse("Course ID  is  required", 400));
    }

    const course = await Courses.findByIdAndDelete(id);

    // If course doesn't exist, return a 404 error
    if (!course) {
      return next(new ErrorResponse(`No course with ID ${id}`, 404));
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  }
);
