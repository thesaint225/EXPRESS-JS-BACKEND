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
exports.deleteBootcamp = exports.updateBootcamp = exports.createBootcamp = exports.getBootcamp = exports.getBootcamps = void 0;
const Bootcamp_1 = __importDefault(require("../models/Bootcamp"));
const async_1 = __importDefault(require("../middleware/async"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
// @description Get all bootcamps
// @route GET /api/v1/bootcamps
// @access public
exports.getBootcamps = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let query;
    // Copy req.query to avoid mutation
    const reqQuery = Object.assign({}, req.query);
    // Fields to exclude
    const removeFields = ["select", "sort", "page", "limit"];
    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach((param) => delete reqQuery[param]);
    // Create query string
    let queryStr = JSON.stringify(reqQuery);
    // MongoDB operators (e.g., gt, gte, lt, lte, in)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, // Replace with MongoDB operators
    (match) => `$${match}`);
    // Finding resources in the database
    query = Bootcamp_1.default.find(JSON.parse(queryStr)).populate("courses");
    console.log(query);
    // Select specific fields if "select" query parameter is provided
    if (typeof req.query.select === "string") {
        const fields = req.query.select.split(",").join(" ");
        query = query.select(fields);
    }
    // Sorting the results if "sort" query parameter is provided
    if (typeof req.query.sort === "string") {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
    }
    else {
        query = query.sort("-timeStamp"); // Default sort by timestamp if not specified
    }
    // Initialize pagination object
    const pagination = {};
    // Pagination logic: default page is 1, and limit is 1 if not provided
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    // Get total count of documents
    const total = yield Bootcamp_1.default.countDocuments();
    // Apply pagination to the query
    query = query.skip(startIndex).limit(limit);
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
    const bootcamps = yield query;
    // Return the response with data and pagination
    res.status(200).json({
        success: true,
        count: bootcamps.length,
        pagination, // Includes next and prev pagination info if applicable
        data: bootcamps,
    });
}));
// @description Get a single bootcamp by ID
// @route GET /api/v1/bootcamps/:id
// @access public
exports.getBootcamp = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const bootcamp = yield Bootcamp_1.default.findById(id);
    if (!bootcamp) {
        return next(new errorResponse_1.default(`Bootcamp not found with id ${id}`, 404));
    }
    res.status(200).json({ success: true, data: bootcamp });
    console.log(id);
}));
// @description Create a new bootcamp
// @route POST /api/v1/bootcamps
// @access private
exports.createBootcamp = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bootcamp = yield Bootcamp_1.default.create(req.body);
    res.status(201).json({
        success: true,
        data: bootcamp,
    });
}));
// @description Update a bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access private
exports.updateBootcamp = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updates = req.body;
    // Validate if "id" exists in the request
    if (!id) {
        return res
            .status(500)
            .json({ success: false, error: "Bootcamp ID is required" });
    }
    // update the bootcamp and return the updated document
    const updateBootcamp = yield Bootcamp_1.default.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
    });
    // handle case where bootcamp is not found
    if (!updateBootcamp) {
        return next(new errorResponse_1.default(`Bootcamp not found with id ${id}`, 404));
    }
    // respond with success and updated bootcamp data
    res.status(200).json({ success: true, data: updateBootcamp });
}));
// @description Delete a bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access private
exports.deleteBootcamp = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deleteBootcamp = yield Bootcamp_1.default.findByIdAndDelete(id);
    if (!deleteBootcamp) {
        return next(new errorResponse_1.default(`Bootcamp not found with id ${id}`, 404));
    }
    res.status(200).json({
        success: true,
        data: {},
    });
}));
