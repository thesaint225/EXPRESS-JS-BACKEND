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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bootcampRoutes_1 = __importDefault(require("./routes/bootcampRoutes"));
const dotenv = __importStar(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = __importDefault(require("../config/db"));
// Load the custom config file (config.env)
const result = dotenv.config({ path: "./config/config.env" });
if (result.error) {
    console.log("Error loading .env file", result.error);
}
console.log(result);
console.log("Mongo URI", process.env.MONGO_URI);
(0, db_1.default)();
// Create an instance of an Express application
const app = (0, express_1.default)();
// Dev logging middleware
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
// Use the imported routes
app.use("/api/v1/bootcamps", bootcampRoutes_1.default); // <-- Fix route prefix
// Middleware to parse JSON request body
app.use(express_1.default.json());
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
