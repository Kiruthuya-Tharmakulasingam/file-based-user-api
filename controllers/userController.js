import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// To get folder path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File location
const dataFile = path.join(__dirname, "../data/users.json");

// Read users
const readUsers = () => {
  return fs.readFile(dataFile, "utf-8").then((data) => JSON.parse(data));
};

// Write users
const writeUsers = (users) => {
  return fs.writeFile(dataFile, JSON.stringify(users, null, 2));
};
