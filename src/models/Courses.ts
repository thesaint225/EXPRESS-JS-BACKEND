import mongoose, { Schema, model, Model } from "mongoose";

type CourseType = {
  title: string;
  description: string;
  weeks: string;
  tuition: number;
  minimumSkill: "beginner" | "intermediate" | "advanced";
  scholarshipAvailable: boolean;
  createdAt: Date;
  bootcamp: mongoose.Types.ObjectId;
};

const CourseSchema = new Schema<CourseType>(
  {
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
    bootcamp: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bootcamp",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Define the static method interface
interface CourseModel extends Model<CourseType> {
  getAverageCost(bootcampId: mongoose.Types.ObjectId): Promise<void>;
}

// statics method to get average of course tuition
CourseSchema.statics.getAverageCost = async function (bootcampId) {
  console.log("calculating avg cost...".blue);
  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
    },
    {
      $group: {
        _id: "$bootcamp",
        averageCost: { $avg: "$tuition" },
      },
    },
  ]);

  try {
    await mongoose.model("Bootcamp").findByIdAndUpdate(bootcampId, {
      averageCost: Math.ceil(obj[0].averageCost / 10) * 10,
    });
  } catch (error) {
    console.error(error);
  }

  console.log(obj);
};

// call getAverage after save
CourseSchema.post("save", function () {
  // Cast this.constructor to CourseModel
  (this.constructor as CourseModel).getAverageCost(this.bootcamp);
});

// call getAverage before remove
CourseSchema.pre("findOneAndDelete", async function () {
  const doc = await this.model.findOne(this.getQuery());
  if (doc) {
    await (doc.constructor as CourseModel).getAverageCost(doc.bootcamp);
  }
});

const Course = model<CourseType>("Course", CourseSchema);

export default Course;
