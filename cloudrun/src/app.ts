import express from "express";
import cookieParser from "cookie-parser";
import { AddressInfo } from "net";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const network = "0.0.0.0";
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
app.set("port", port);

const server = app.listen(port, network, () => {
  const { address, port } = server.address() as AddressInfo;
  console.log(`Listening on ${address}:${port}`);
});

server.on("error", (error: NodeJS.ErrnoException) => {
  if (error.syscall !== "listen") throw error;

  // handle specific listen errors with friendly messages
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
  process.on(sig, async () => await shutdown(sig));
});

async function shutdown(signal: string) {
  if (signal == "SIGINT") console.log(); // Need linefeed
  console.log(`Received ${signal}, shutting down server.`);
  await server.close(); // Close the wrapped HTTP server.
  console.log("Done.");
  process.exit();
}

app.get("/", (req, res) => {
  res.status(200).send("hello");
});
