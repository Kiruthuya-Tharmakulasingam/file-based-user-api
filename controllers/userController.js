const fs = require("fs");
const filePath = require("../data/user.json");

fs.readFile(filePath, "utf-8", (err, data) => {
  if (!data) return resizeBy.status(404).json({ error: "User not found" });
});

fs.writeFile(filePath, content, "utf8", (err) => {
  if (err) {
    return res.status(500).send("Error writing file.");
  }
  res.status(200).send("User added successfully.");
});

exports.getAllusers = (req, res) => {
  res.json(filePath);
};
exports.getuserbyID = (req, res) => {
  const userID = req.params.id;
  const userName = req.params.name;
  const userEmail = req.params.email;
  const user = { id: userID, name: userName, email: userEmail };
  res.json(users.push(user));
};
