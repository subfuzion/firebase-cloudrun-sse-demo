import { Request, Response } from "express";
import { Database } from "./database";

const db = new Database();

// For SSE
const INTERVAL = 50; // ms
const ID = "sensor1";
// Track active clients; remove clients when they disconnect:
// Map client req -> res.
const clients = new Map();
let intervalId: NodeJS.Timer;

export function handlePost(req: Request, res: Response) {
  const { value } = req.body;
  // console.log(`received: ${value}`);
  db.appendData(value);
  res.header("Keep-Alive", "false");
  return res.status(200).end();
}

export function handleGet(req: Request, res: Response) {
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

// Keep track of client connections

function addClient(req: Request, res: Response) {
  console.log("add client");
  clients.set(req, res);
  req.on("close", () => {
    // eslint-disable-next-line no-use-before-define
    removeClient(req);
  });
  // eslint-disable-next-line no-use-before-define
  if (clients.size === 1) startBroadcast();
}

function removeClient(req: Request) {
  console.log("remove client");
  const res = clients.get(req);
  try {
    res.end();
  } catch {
    console.log("client response ended");
  }
  clients.delete(req);
  // eslint-disable-next-line no-use-before-define
  if (!clients.size) stopBroadcast();
}

function startBroadcast() {
  console.log("start broadcast");
  intervalId = setInterval(() => {
    const value = db.getData();
    if (value !== -1) {
      for (const [req, res] of clients) {
        try {
          sendSSE(res, ID, value);
        } catch {
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
function sendSSE(res: Response, id: string, value: number) {
  if (value === -1) return;
  console.log(`sending value: ${value}`);
  res.write(`id: ${id}\n`);
  res.write(`data: ${value.toString()}\n`);
  res.write("\n");
}
