"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBootcamp = exports.updateBootcamp = exports.createBootcamp = exports.getBootcamp = exports.getBootcamps = void 0;
// @description Get all bootcamps
// @route GET /api/v1/bootcamps
// @access public
const getBootcamps = (req, res, next) => {
    res.status(200).json({ success: true, msg: "Show all bootcamps" });
};
exports.getBootcamps = getBootcamps;
// @description Get a single bootcamp by ID
// @route GET /api/v1/bootcamps/:id
// @access public
const getBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Get bootcamp ${req.params.id}` });
};
exports.getBootcamp = getBootcamp;
// @description Create a new bootcamp
// @route POST /api/v1/bootcamps
// @access private
const createBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: "Create new bootcamp" });
};
exports.createBootcamp = createBootcamp;
// @description Update a bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access private
const updateBootcamp = (req, res, next) => {
    res
        .status(200)
        .json({ success: true, msg: `Update bootcamp ${req.params.id}` });
};
exports.updateBootcamp = updateBootcamp;
// @description Delete a bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access private
const deleteBootcamp = (req, res, next) => {
    res
        .status(200)
        .json({ success: true, msg: `Delete bootcamp ${req.params.id}` });
};
exports.deleteBootcamp = deleteBootcamp;
