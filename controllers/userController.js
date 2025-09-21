const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/users.json");

// Get all users
exports.getAllUsers = (req, res) => {
  // Read all users from the file
  const users = readUsersFromFile();

  // Send the list of users as JSON
  res.json(users);
};

// Get user by ID
exports.getUserById = (req, res) => {
  // Read all users from the file
  const users = readUsers();

  // Convert id from string to number
  const id = parseInt(req.params.id);

  // Find the user with matching id
  const user = users.find((u) => u.id === id);

  // If no user found, return 404
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};
