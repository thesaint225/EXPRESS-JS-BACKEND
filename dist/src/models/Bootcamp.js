"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
// Define the interface for Bootcamp
const bootcampSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
        unique: true,
        trim: true,
        maxlength: [50, "Name cannot be longer than 50 characters"],
    },
    slug: String,
    description: {
        type: String,
        required: [true, "Please add a description"],
        maxlength: [500, "Description cannot be longer than 500 characters"],
    },
    website: {
        type: String,
        // match: [
        //   "/^(https?://)?(www.)?([a-zA-Z0-9-]+.)+[a-zA-Z]{2,}(/[^s]*)?$/",
        //   "Please provide a valid URL",
        // ],
    },
    phone: {
        type: String,
        // match: [
        //   "/^(?:+?d{1,3}[- ]?)?(?:(?d{1,4})?[- ]?)?d{1,4}[- ]?d{1,4}[- ]?d{1,9}$/",
        //   "Please provide a valid phone number",
        // ],
    },
    email: {
        type: String,
        // match: [
        //   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
        //   "Please provide a valid email address",
        // ],
    },
    address: {
        type: String,
        required: [true, "Please add an address"],
    },
    location: {
        name: {
            type: String,
            //  required: true
        },
        location: {
            type: {
                type: String,
                enum: ["Point"],
                // required: true,
            },
            coordinates: {
                type: [Number],
                // required: true,
                index: "2dsphere",
            },
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String,
    },
    careers: {
        type: [String],
        required: true,
        enum: [
            "Web Development",
            "Mobile Development",
            "UI/UX",
            "Data Science",
            "Business",
            "Other",
        ],
    },
    averageRating: {
        type: Number,
        min: [1, "Rating must be at least 1"],
        max: [10, "Rating cannot be more than 10"],
    },
    averageCost: Number,
    photo: {
        type: String,
        default: "no-photo.jpg",
    },
    housing: {
        type: Boolean,
        default: false,
    },
    jobAssistance: {
        type: Boolean,
        default: false,
    },
    jobGuarantee: {
        type: Boolean,
        default: false,
    },
    acceptGi: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
// create bootcamp slug from the name
bootcampSchema.pre("save", function (next) {
    this.slug = (0, slugify_1.default)(this.name, {
        lower: true,
    });
    next();
});
const Bootcamp = (0, mongoose_1.model)("Bootcamp", bootcampSchema);
exports.default = Bootcamp;
