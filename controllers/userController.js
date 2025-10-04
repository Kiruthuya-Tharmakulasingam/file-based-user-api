import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// set directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File path
const filePath = path.join(__dirname, "../data/users.json");

// Read users
function readUsers() {
  try {
    const data = readFileSync(filePath, "utf-8");
    return JSON.parse(data || "[]");
  } catch (err) {
    return [];
  }
}

// Write users
function writeUsers(users) {
  writeFileSync(filePath, JSON.stringify(users, null, 2));
}

// Get all users
export const getAllUsers = (req, res) => {
  try {
    const users = readUsers();
    res.status(200).json(users);
  } catch {
    res.status(500).json({ message: "Cannot read users" });
  }
};

// Get one user
export const getUserById = (req, res) => {
  try {
    const users = readUsers();
    const id = parseInt(req.params.id);
    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch {
    res.status(500).json({ message: "Error getting user" });
  }
};

// Create user
export const createUser = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Please enter name and email" });
  }

  try {
    const users = readUsers();

    const emailUsed = users.some((u) => u.email === email);

    if (emailUsed) {
      return res.status(400).json({ message: "Email already used" });
    }

    const newUser = {
      id: length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      name,
      email,
    };

    users.push(newUser);
    writeUsers(users);

    res.status(201).json({ message: "User added", user: newUser });
  } catch {
    res.status(500).json({ message: "Cannot add user" });
  }
};

// Update user
export const updateUser = (req, res) => {
  const id = parseInt(req.params.id);

  const { name, email } = req.body;

  try {
    const users = readUsers();
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    if (email && users.some((u) => u.email === email && u.id !== id)) {
      return res.status(400).json({ message: "Email used by another user" });
    }

    if (name) users[index].name = name;
    if (email) users[index].email = email;

    writeUsers(users);

    res.status(200).json({ message: "User updated", user: users[index] });
  } catch {
    res.status(500).json({ message: "Cannot update user" });
  }
};

// Delete user
export const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const users = readUsers();
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    users.splice(index, 1);
    writeUsers(users);

    res.status(200).json({ message: "User deleted" });
  } catch {
    res.status(500).json({ message: "Cannot delete user" });
  }
};
