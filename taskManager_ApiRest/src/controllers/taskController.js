const taskModel = require("../models/task");

const taskController = {
	create: async(req, res) => {
		try {
			const task = {
				title: req.body.title,
				description: req.body.description,
				status: req.body.status,
			};
			
			const response = await taskModel.create(task);
			
			res.status(200).json({ response, msg: "Task created !"});
		} catch (error) {
			console.log(error);
			return res.status(400).send({ error: 'Failed to create task'});
		}
	},
	getAll: async (req, res) => {
		try {
			const tasks = await taskModel.find();
			
			res.json(tasks);
		} catch (error) {
			return res.status(400).send({ error: 'Failed to get tasks'});
		}
	},
	get: async (req, res) => {
		try {
			const id = req.params.id;
			const task = await taskModel.findById(id);
			
			if(!task) {
				return res.status(404).send({error: 'Task not found'});
			}
			
			res.json(task);
		} catch (e) {
			return res.status(400).send({ error: 'Failed to get the task'});
		}
	},
	delete: async (req, res) => {
		try {
			const id = req.params.id;
			const task = await taskModel.findById(id);
			
			if(!task) {
				return res.status(404).send({ error : 'Task not found'});
			}
			
			const deletedTask = await taskModel.findByIdAndDelete(id);
			
			res.status(200).json({ deletedTask, msg: 'Task deleted'});
		} catch (error) {
			return res.status(400).send({ error: 'Cant delete task'});
		}
	},
	update: async (req, res) => {
		try {
			const id = req.params.id;
			const task = {
				status: req.body.status,
			};
			
			const updatedTask = await taskModel.findByIdAndUpdate(id, task);
			if(!updatedTask) {
				return res.status(404).json({ error: 'Task not found'});
			}
			
			res.status(200).json({ task, msg: 'Task as updated'});
		} catch (error) {
			return res.status(400).send({ error: 'Cant update task'});
		}
	}
};

module.exports = taskController;