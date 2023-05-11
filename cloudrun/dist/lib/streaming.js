"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGet = exports.handlePost = void 0;
const database_1 = require("./database");
const db = new database_1.Database();
// For SSE
const INTERVAL = 50; // ms
const ID = "sensor1";
// Track active clients; remove clients when they disconnect:
// Map client req -> res.
const clients = new Map();
let intervalId;
function handlePost(req, res) {
    const { value } = req.body;
    // console.log(`received: ${value}`);
    db.appendData(value);
    res.header("Keep-Alive", "false");
    return res.status(200).end();
}
exports.handlePost = handlePost;
function handleGet(req, res) {
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
    });
    res.flushHeaders();
    addClient(req, res);
    // Send initial data;
    sendSSE(res, ID, db.getData());
}
exports.handleGet = handleGet;
// Keep track of client connections
function addClient(req, res) {
    console.log("add client");
    clients.set(req, res);
    req.on("close", () => {
        // eslint-disable-next-line no-use-before-define
        removeClient(req);
    });
    // eslint-disable-next-line no-use-before-define
    if (clients.size === 1)
        startBroadcast();
}
function removeClient(req) {
    console.log("remove client");
    const res = clients.get(req);
    try {
        res.end();
    }
    catch (_a) {
        console.log("client response ended");
    }
    clients.delete(req);
    // eslint-disable-next-line no-use-before-define
    if (!clients.size)
        stopBroadcast();
}
function startBroadcast() {
    console.log("start broadcast");
    intervalId = setInterval(() => {
        const value = db.getData();
        if (value !== -1) {
            for (const [req, res] of clients) {
                try {
                    sendSSE(res, ID, value);
                }
                catch (_a) {
                    removeClient(req);
                }
            }
        }
    }, INTERVAL);
}
function stopBroadcast() {
    console.log("stop broadcast");
    clearInterval(intervalId);
}
/**
 * Sends SSE to browser.
 * @param res Response object
 * @param id Optional, used to identify a specific event source
 * @param value The payload that will be sent (available on the SSE `data` prop
 *             as a JSON encoded string).
 */
function sendSSE(res, id, value) {
    if (value === -1)
        return;
    console.log(`sending value: ${value}`);
    res.write(`id: ${id}\n`);
    res.write(`data: ${value.toString()}\n`);
    res.write("\n");
}
