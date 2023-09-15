const mongoose = require("mongoose");

const { Schema } = mongoose;

const taskSchema = new Schema({
	title: {
		type: String,
		unique: true,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	status: {
		type: String,
		required: true,
		enum: ["Pendente", "Em andamento", "Concluida"],
	},
}, { timestamps: true});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;