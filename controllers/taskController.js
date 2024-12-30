const taskSchema = require("../models/task");
const userSchema = require("../models/users");

// for task create
const task = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const { id } = req.headers;
    const newTask = new taskSchema({ title: title, desc: desc });
    const saveTask = await newTask.save();
    const taskId = saveTask._id;
    await userSchema.findByIdAndUpdate(id, { $push: { tasks: taskId._id } });
    res.status(200).json({ message: "Task Created" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Internal Server Error" });
  }
};

// get all tasks
const getAllTask = async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await userSchema.findById(id).populate({
         path: "tasks", 
         options: { sort: { createdAt: -1 } },
     });
    res.status(200).json({ data: userData });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Internal Server Error" });
  }
};

// delete task
const deleteTask = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.headers.id;
      await taskSchema.findByIdAndDelete(id);
      await userSchema.findByIdAndUpdate(userId, { $pull : {tasks : id} });
      res.status(200).json({ message : "Task Deleted Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Internal Server Error" });
    }
  };

//    update task
const updateTask = async (req, res) => {
    try {
      const { id } = req.params;
      const {title, desc} = req.body;
      await taskSchema.findByIdAndUpdate(id, { title : title, desc : desc })
      res.status(200).json({ message : "Task Updated Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Internal Server Error" });
    }
  };

  //    update important  task
// const updateImptTask = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const taskData = await taskSchema.findById(id);
//       const impTask = taskData.important;
//       await taskSchema.findByIdAndUpdate(id, { important : !impTask   })
//       res.status(200).json({ message : "Task Updated Successfully" });
//     } catch (error) {
//       console.log(error);
//       return res.status(400).json({ message: "Internal Server Error" });
//     }
//   };

  //   update complete   task
const updateCompleteTask = async (req, res) => {
    try {
      const { id } = req.params;
      const taskData = await taskSchema.findById(id);
      const completeTask = taskData.complete;
      await taskSchema.findByIdAndUpdate(id, { complete : !completeTask   })
      res.status(200).json({ message : "Task Updated Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Internal Server Error" });
    }
  };

  
// get important tasks
// const getImpTask = async (req, res) => {
//     try {
//       const { id } = req.headers;
//       const Data = await userSchema.findById(id).populate({
//            path: "tasks", 
//            match : {important : true},
//            options: { sort: { createdAt: -1 } },
//        });
//        const impTaskData = Data.tasks;
//       res.status(200).json({ data: impTaskData });
//     } catch (error) {
//       console.log(error);
//       return res.status(400).json({ message: "Internal Server Error" });
//     }
//   };

  // get complete tasks
const getCompleteTask = async (req, res) => {
    try {
      const { id } = req.headers;
      const Data = await userSchema.findById(id).populate({
           path: "tasks", 
           match : {complete : true},
           options: { sort: { createdAt: -1 } },
       });
       const completeTaskData = Data.tasks;
      res.status(200).json({ data: completeTaskData });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Internal Server Error" });
    }
  };

   // get Incomplete tasks
const getInCompleteTask = async (req, res) => {
    try {
      const { id } = req.headers;
      const Data = await userSchema.findById(id).populate({
           path: "tasks", 
           match : {complete : false},
           options: { sort: { createdAt: -1 } },
       });
       const completeTaskData = Data.tasks;
      res.status(200).json({ data: completeTaskData });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Internal Server Error" });
    }
  };
  

module.exports = {
  task,
  getAllTask,
  deleteTask,
  updateTask,
  // updateImptTask,
  updateCompleteTask,
  // getImpTask,
  getCompleteTask,
  getInCompleteTask
  
};
