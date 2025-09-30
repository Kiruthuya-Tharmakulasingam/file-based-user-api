// const express = require("express");
// const bodyParser = require("body-parser");
// const userRoutes = require("./routes/userRoutes");

// const app = express();
// app.use(bodyParser.json());

// app.use("/api/users", userRoutes);

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const api = express();
const PORT = 5000;

api.get("/", (req, res) => {
  res.send("Hello Express!");
});
api.get("/users", (req, res) => {
  res.send(users);
});
api.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  res.send(user);
});
api.post("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  res.send(user);
});
api.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  res.send(user);
});
api.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
