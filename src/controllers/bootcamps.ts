import { Request, Response, NextFunction } from "express";
import Bootcamp from "../models/Bootcamp";
import asyncHandler from "../middleware/async";
import ErrorResponse from "../utils/errorResponse";

// @description Get all bootcamps
// @route GET /api/v1/bootcamps
// @access public
export const getBootcamps = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let query;

    // Copy req.query to avoid mutation
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ["select", "sort", "page", "limit"];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach((param) => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // MongoDB operators (e.g., gt, gte, lt, lte, in)
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g, // Replace with MongoDB operators
      (match) => `$${match}`
    );

    // Finding resources in the database
    query = Bootcamp.find(JSON.parse(queryStr)).populate("courses");
    // console.log(query);

    // Select specific fields if "select" query parameter is provided
    if (typeof req.query.select === "string") {
      const fields = req.query.select.split(",").join(" ");
      query = query.select(fields);
    }

    // Sorting the results if "sort" query parameter is provided
    if (typeof req.query.sort === "string") {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-timeStamp"); // Default sort by timestamp if not specified
    }

    // Initialize pagination object
    const pagination: {
      next?: { page: number; limit: number };
      prev?: { page: number; limit: number };
    } = {};

    // Pagination logic: default page is 1, and limit is 1 if not provided
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Get total count of documents
    const total = await Bootcamp.countDocuments();

    // Apply pagination to the query
    query = query.skip(startIndex).limit(limit).populate({
      path: "courses",
      select: "title",
    });
    // .populate("courses");

    // Set the next page if there are more results
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit: limit,
      };
    }

    // Set the previous page if it's not the first page
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit: limit,
      };
    }

    // Execute the query and get the bootcamps
    const bootcamps = await query;

    // Return the response with data and pagination
    res.status(200).json({
      success: true,
      count: bootcamps.length,
      pagination, // Includes next and prev pagination info if applicable
      data: bootcamps,
    });
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

    const deleteBootcamp = await Bootcamp.findById(id);
    if (!deleteBootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with id ${id}`, 404));
    } else {
      await deleteBootcamp.deleteOne();
      console.log("Bootcamp and related courses deleted");
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  }
);

// @description       Upload photo for bootcamp
// @route             PUT/api/v1/bootcamps/:id/photo
// @access            private
export const bootcampPhotoUpload = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const bootcamp = await Bootcamp.findById(id);
    if (!bootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with id ${id}`, 404));
    }
    if (!req.files) {
      return next(new ErrorResponse(`please upload a file `, 400));
    }

    console.log(req.files);
  }
);
