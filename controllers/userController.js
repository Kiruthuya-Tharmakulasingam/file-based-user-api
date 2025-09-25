const { error } = require("console");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/users.json");

// // Get all users
// exports.getAllUsers = (req, res) => {
//   // Read all users from the file
//   const users = readUsersFromFile();

//   // Send the list of users as JSON
//   res.json(users);
// };

// // Get user by ID
// exports.getUserById = (req, res) => {
//   // Read all users from the file
//   const users = readUsers();

//   // Convert id from string to number
//   const id = parseInt(req.params.id);

//   // Find the user with matching id
//   const user = users.find((u) => u.id === id);

//   // If no user found, return 404
//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   res.json(user);
// };
fs.readFile(filePath, "utf-8", (err, data) => {
  if (!data) return resizeBy.status(404).json({ error: "User not found" });
});

fs.writeFile(filePath, content, "utf8", (err) => {
  if (err) {
    return res.status(500).send("Error writing file.");
  }
  res.status(200).send("User added successfully.");
});
