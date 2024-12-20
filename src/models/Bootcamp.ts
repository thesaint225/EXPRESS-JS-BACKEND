import mongoose, { Schema, Document, Model, model } from "mongoose";
import slugify from "slugify";

type Bootcamp = {
  name: string;
  slug: string;
  description: string;
  website?: string;
  phone?: string;
  email?: string;
  address: string;
  location: {
    name: string;
    location: {
      type: "Point";
      coordinates: [number, number];
    };
    formattedAddress?: string;
    street?: string;
    city?: string;
    state?: string;
    zipcode?: string;
    country?: string;
  };
  careers: (
    | "Web Development"
    | "Mobile Development"
    | "UI/UX"
    | "Data Science"
    | "Business"
    | "Other"
  )[];
  averageRating?: number;
  averageCost?: number;
  photo?: string;
  housing?: boolean;
  jobAssistance?: boolean;
  jobGuarantee?: boolean;
  acceptGi?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

// Define the interface for Bootcamp
const bootcampSchema = new Schema<Bootcamp>(
  {
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
  },
  {
    timestamps: true,
  }
);

// create bootcamp slug from the name
bootcampSchema.pre("save", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
  });
  next();
});

const Bootcamp = model<Bootcamp>("Bootcamp", bootcampSchema);

export default Bootcamp;
