const express = require('express');
const router = express.Router();
const { task, 
    getAllTask,
    deleteTask,
    updateTask,
    // updateImptTask,
    updateCompleteTask,
    // getImpTask,
    getCompleteTask,
    getInCompleteTask
} = require("../controllers/taskController");
const { authenticateToken } = require("./auth");

router.post("/create-task", authenticateToken, task);
router.get("/get-all-task", authenticateToken, getAllTask);
router.delete("/delete-task/:id", authenticateToken, deleteTask);
router.put("/update-task/:id", authenticateToken, updateTask);
// router.put("/update-imp-task/:id", authenticateToken, updateImptTask);
router.put("/update-complete-task/:id", authenticateToken, updateCompleteTask);
// router.get("/get-imp-task", authenticateToken, getImpTask);
router.get("/get-complete-task", authenticateToken, getCompleteTask);
router.get("/get-in-complete-task", authenticateToken, getInCompleteTask);


module.exports = router;
