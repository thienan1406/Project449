const express = require("express");
const cors = require("cors");

const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());

const contactsRouter = require("./app/routes/contact.route");

app.get("/", (req, res) => {
  res.json({ message: "Welcome to book application" });
});

app.use("/api/contacts", contactsRouter);

app.use((req, res, next) => {
  //Code o day se chay khi khong co route duoc dinh nghia nao
  //khop voi yeu cau. Goi next() de chuyen sang middleware xu ly loi
  return next(new ApiError(404, "Resource not found"));
});

//define error-handling middleware last, after other app.use() and routes calls
//Middleware xử lý lỗi tập trung
app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
