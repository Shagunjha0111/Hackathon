const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const users = []; // In-memory user storage
const secretKey = process.env.JWT_SECRET || "default_secret"; // Use environment variable

const register = async (req, res) => {
  const { name, email, password } = req.body;
  
  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, name, email, password: hashedPassword };
  users.push(newUser);

  res.status(201).json({ message: "User registered successfully" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);

  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: "1h" });

  res.json({ message: "Login successful", token });
};

module.exports = { register, login };
