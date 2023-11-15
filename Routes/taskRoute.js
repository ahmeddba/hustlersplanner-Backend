const express = require('express');
const router = express.Router();
const Task = require('../Models/TaskSchema');
const { addTask , allTasks , getTaskById , updateById, deleteTask} = require('../Controllers/taskController');

//create and save a recor of task
router.post('/addTask', addTask);

// get all tasks
router.get('/allTasks',allTasks);

// get a task by id
router.get('/task/:_id', getTaskById);

// update a task by id
router.put('/task/:_id',updateById);

//delete task by id
router.delete('/task/:_id', deleteTask);

module.exports = router;
