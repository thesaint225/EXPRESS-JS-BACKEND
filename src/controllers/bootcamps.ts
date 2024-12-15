import { Request, Response, NextFunction, response } from "express";
import Bootcamp from "../models/Bootcamp";
import ErrorResponse from "../utils/errorResponse";

// @description Get all bootcamps
// @route GET /api/v1/bootcamps
// @access public
export const getBootcamps = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bootcamps = await Bootcamp.find();
    res
      .status(200)
      .json({ success: true, count: bootcamps.length, data: bootcamps });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

// @description Get a single bootcamp by ID
// @route GET /api/v1/bootcamps/:id
// @access public
export const getBootcamp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    console.log("Bootcamp Id", id);
    const bootcamp = await Bootcamp.findById(id);

    if (!bootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with id ${id}`, 404));
    }

    res.status(200).json({ success: true, data: bootcamp });
    console.log(id);
  } catch (error) {
    if (error instanceof Error)
      return next(
        new ErrorResponse(
          `Failed to retrieve bootcamp.Error:${error.message}`,
          500
        )
      );
  }
};

// @description Create a new bootcamp
// @route POST /api/v1/bootcamps
// @access private
export const createBootcamp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

// @description Update a bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access private

export const updateBootcamp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
      return res
        .status(404)
        .json({ success: false, error: "bootcamp not found " });
    }
    // respond with success and updated bootcamp data
    res.status(200).json({ success: true, data: updateBootcamp });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, error: error.message });
    } else {
      res.status(500).json({ sucess: false, error: "unknown error " });
    }
  }
};

// @description Delete a bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access private
export const deleteBootcamp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const deleteBootcamp = await Bootcamp.findByIdAndDelete(id);
    if (!deleteBootcamp) {
      return res.status(400).json("bootcamp not found ");
    }
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, error: error.message });
    } else {
      res.status(500).json({ success: false, error: "unknown error " });
    }
  }
};
