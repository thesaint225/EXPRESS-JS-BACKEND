import mongoose, { Schema, model } from "mongoose";

type Course = {
  title: string;
  description: string;
  weeks: string;
  tuition: number;
  minimumSkill: "beginner" | "intermediate" | "advanced";
  scholarshipAvailable: boolean;
  createdAt: Date;
  bootcamp: mongoose.Schema.Types.ObjectId;
};

const CourseSchema = new Schema<Course>({
  title: {
    type: String,
    trim: true,
    required: [true, "please add a course title "],
  },
  description: {
    type: String,
    required: [true, "please add a description "],
  },
  weeks: {
    type: String,
    required: [true, "please add a number of weeks  "],
  },
  tuition: {
    type: Number,
    required: [true, "please add a tuition cost   "],
  },
  minimumSkill: {
    type: String,
    required: [true, "please add a minimum skill required  "],
    enum: ["beginner", "intermediate", "advanced"],
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
});

const Course = model<Course>("Course", CourseSchema);

export default Course;
