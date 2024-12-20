"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const fs = __importStar(require("fs"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
console.log("Before dotenv config");
// Log the current directory to check where the script is being run
console.log("Current directory:", __dirname);
console.log("Before dotenv config");
// load env vars
(0, dotenv_1.config)({ path: "./config/config.env" });
console.log("after dotenv config");
console.log(process.env.MONGO_URI);
// Load models
const Bootcamp_1 = __importDefault(require("./models/Bootcamp"));
const path_1 = __importDefault(require("path"));
// connect to DB
if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in the environment variables");
}
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    console.log("MongoDB connected successfully".green.bold);
})
    .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err.message}`.red.bold);
    process.exit(1); // Exit process with failure
});
//   Read JSON files
const bootcampsFilePath = path_1.default.join(__dirname, "src", "_data", "bootcamps.json");
console.log("Resolved path to bootcamps.json:", bootcampsFilePath);
// Read JSON file
const bootcamps = JSON.parse(fs.readFileSync(bootcampsFilePath, "utf-8"));
// import into Data base
const importData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Bootcamp_1.default.create(bootcamps);
        console.log("Data Imported...".green.inverse);
        process.exit();
    }
    catch (error) {
        console.error(error);
    }
});
// delete data
const deleteData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Bootcamp_1.default.deleteMany();
        console.log("Data destroyed...".red.inverse);
        process.exit();
    }
    catch (error) {
        console.error(error);
    }
});
if (process.argv[2] === "-i") {
    importData();
}
else if (process.argv[2] === "-d") {
    deleteData();
}
