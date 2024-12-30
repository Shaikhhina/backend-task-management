var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var usersRouter = require("./routes/usersRouter");
var tasksRouter = require("./routes/taskRouter");
var getAllTasksRouter = require("./routes/taskRouter");
var deleteTaskRouter = require("./routes/taskRouter");
var updateTaskRouter = require("./routes/taskRouter");
var updatecompleteTaskRouter = require("./routes/taskRouter");
var getCompleteTaskRouter = require("./routes/taskRouter");
var getInCompleteTaskRouter = require("./routes/taskRouter");

var app = express();
const cors = require("cors");
require("./config");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/userSignUp", usersRouter);
app.use("/userSignIn", usersRouter);
app.use("/createTask", tasksRouter);
app.use("/getAllTask", getAllTasksRouter);
app.use("/deleteTask", deleteTaskRouter);
app.use("/updateTask", updateTaskRouter);
app.use("/updatecompleteTask", updatecompleteTaskRouter);
app.use("/getCompleteTask", getCompleteTaskRouter);
app.use("/getInCompleteTask", getInCompleteTaskRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
