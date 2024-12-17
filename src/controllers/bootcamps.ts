import { Request, Response, NextFunction, response } from "express";
import Bootcamp from "../models/Bootcamp";
import asyncHandler from "../middleware/async";
import ErrorResponse from "../utils/errorResponse";

// @description Get all bootcamps
// @route GET /api/v1/bootcamps
// @access public
export const getBootcamps = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const bootcamps = await Bootcamp.find();
    res
      .status(200)
      .json({ success: true, count: bootcamps.length, data: bootcamps });
  }
);

// @description Get a single bootcamp by ID
// @route GET /api/v1/bootcamps/:id
// @access public
export const getBootcamp = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const bootcamp = await Bootcamp.findById(id);

    if (!bootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with id ${id}`, 404));
    }

    res.status(200).json({ success: true, data: bootcamp });
    console.log(id);
  }
);

// @description Create a new bootcamp
// @route POST /api/v1/bootcamps
// @access private
export const createBootcamp = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  }
);

// @description Update a bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access private

export const updateBootcamp = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updates = req.body;

    // Validate if "id" exists in the request
    if (!id) {
      return res
        .status(500)
        .json({ success: false, error: "Bootcamp ID is required" });
    }
    // update the bootcamp and return the updated document
    const updateBootcamp = await Bootcamp.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    // handle case where bootcamp is not found
    if (!updateBootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with id ${id}`, 404));
    }
    // respond with success and updated bootcamp data
    res.status(200).json({ success: true, data: updateBootcamp });
  }
);

// @description Delete a bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access private
export const deleteBootcamp = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const deleteBootcamp = await Bootcamp.findByIdAndDelete(id);
    if (!deleteBootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with id ${id}`, 404));
    }
    res.status(200).json({
      success: true,
      data: {},
    });
  }
);
