"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const streaming_1 = require("./lib/streaming");
const app = (0, express_1.default)();
// Use CORS for local development
app.use((0, cors_1.default)({ origin: "http://localhost:3000" }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.status(200).send("hello");
});
app.post("/api/data", streaming_1.handlePost);
app.get("/api/data", streaming_1.handleGet);
exports.default = app;
