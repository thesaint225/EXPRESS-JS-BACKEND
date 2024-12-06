import { Request, Response, NextFunction } from "express";

// @description Get all bootcamps
// @route GET /api/v1/bootcamps
// @access public
export const getBootcamps = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({ success: true, msg: "Show all bootcamps" });
};

// @description Get a single bootcamp by ID
// @route GET /api/v1/bootcamps/:id
// @access public
export const getBootcamp = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({ success: true, msg: `Get bootcamp ${req.params.id}` });
};

// @description Create a new bootcamp
// @route POST /api/v1/bootcamps
// @access private
export const createBootcamp = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({ success: true, msg: "Create new bootcamp" });
};

// @description Update a bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access private
export const updateBootcamp = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res
    .status(200)
    .json({ success: true, msg: `Update bootcamp ${req.params.id}` });
};

// @description Delete a bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access private
export const deleteBootcamp = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete bootcamp ${req.params.id}` });
};
