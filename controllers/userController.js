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

// Add new user
export const createUser = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Please enter name and email" });
  }

  try {
    const users = await readUsers();
    const emailUsed = users.some((u) => u.email === email);

    if (emailUsed) {
      return res.status(400).json({ message: "Email already used" });
    }

    const newId =
      users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;

    const newUser = { id: newId, name, email };
    users.push(newUser);

    await writeUsers(users);
    res.status(201).json({ message: "User added", user: newUser });
  } catch {
    res.status(500).json({ message: "Cannot add user" });
  }
};

// Update user
export const updateUser = async (req, res) => {
  const userId = parseInt(req.params.id);
  const name = req.body.name?.trim();

  try {
    const users = await readUsers();
    const index = users.findIndex((u) => u.id === userId);

    if (index === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    const emailUsed = users.some((u) => u.email === email && u.id !== userId);

    if (email && emailUsed) {
      return res.status(400).json({ message: "Email used by another user" });
    }

    if (name) users[index].name = name;
    if (email) users[index].email = email;

    await writeUsers(users);
    res.status(200).json({ message: "User updated", user: users[index] });
  } catch {
    res.status(500).json({ message: "Cannot update user" });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const users = await readUsers();
    const index = users.findIndex((u) => u.id === userId);

    if (index === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    users.splice(index, 1);
    await writeUsers(users);

    res.status(200).json({ message: "User deleted" });
  } catch {
    res.status(500).json({ message: "Cannot delete user" });
  }
};
