import fs from "fs";
import path from "path";

// Create a log file path
const logFilePath = path.join(process.cwd(), "requests.log");

export const requestLogger = (req, res, next) => {
  const log = `${new Date().toISOString()} | ${req.method} | ${req.url} | ${req.ip}\n`;

  // Append log to file
  fs.appendFile(logFilePath, log, (err) => {
    if (err) {
      console.error("Failed to write log:", err);
    }
  });

  next();
};
