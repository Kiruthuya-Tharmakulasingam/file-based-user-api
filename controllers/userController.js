import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// To get folder path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File location
const dataFile = path.join(__dirname, "../data/users.json");

// Read users
const readUsers = async () => {
  const data = await fs.readFile(dataFile, "utf-8");
  return JSON.parse(data);
};

// Write users
const writeUsers = async (users) => {
  await fs.writeFile(dataFile, JSON.stringify(users, null, 2));
};
// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await readUsers();
    res.status(200).json(users);
  } catch {
    res.status(500).json({ message: "Cannot read user list" });
  }
};

// Get one user by ID
export const getUserById = async (req, res) => {
  try {
    const users = await readUsers();
    const userId = parseInt(req.params.id);
    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch {
    res.status(500).json({ message: "Error getting user" });
  }
};
