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
const app_1 = __importDefault(require("./app"));
const network = "0.0.0.0";
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
app_1.default.set("port", port);
const server = app_1.default.listen(port, network, () => {
    const { address, port } = server.address();
    console.log(`Listening on ${address}:${port}`);
});
server.on("error", (error) => {
    if (error.syscall !== "listen")
        throw error;
    // Improve local development experience with friendly error messages
    switch (error.code) {
        case "EACCES":
            console.error(`Error: port ${port} requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(`Error: port ${port} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
});
// Handle signals for graceful shutdown.
["SIGTERM", "SIGINT"].forEach((sig) => {
    process.on(sig, () => __awaiter(void 0, void 0, void 0, function* () { return yield shutdown(sig); }));
});
function shutdown(signal) {
    return __awaiter(this, void 0, void 0, function* () {
        if (signal == "SIGINT")
            console.log(); // Need linefeed
        console.log(`Received ${signal}, shutting down server.`);
        yield server.close(); // Close the wrapped HTTP server.
        console.log("Done.");
        process.exit();
    });
}
