const request = require("supertest");

it("Shoul show an object in json format with all properties", async () => {
	const response = await request("http://localhost:3000").get("/api/tasks/64fcf86560322a6f2a3d8186");
	
	expect(response.status).toBe(200);
	expect(response.body._id).toBeDefined();
	expect(response.body.title).toBeDefined();
	expect(response.body.description).toBeDefined();
	expect(response.body.status).toBeDefined();
	expect(response.body.createdAt).toBeDefined();
	expect(response.body.updatedAt).toBeDefined();
});

it("Should return status 404 for id non-existent", async () => {
	const response = await request("http://localhost:3000").get("/api/tasks/64fcf86560322a6f2a3d8190");
	
	expect(response.status).toBe(404);
	expect(response.body).toMatchObject({
		error: "Task not found"
	});
});

it("Should send a json object to database", async () => {
	const data = {
		"title": "jest test",
		"description": "test with jest",
		"status": "Pendente"
	};
	
	const response = await request("http://localhost:3000").post("/api/task").send(data).set("Accept", "application/json");
	
	expect(response.status).toBe(200);
	expect(response.body).toMatchObject({
		msg: "Task created !"
	})
	
});

it("Should return status 400 when send data aready existent", async () => {
	const data = {
		"title": "jest test",
		"description": "test with jest",
		"status": "Pendente"
	};
	
	const response = await request("http://localhost:3000").post("/api/task").send(data).set("Accept", "application/json");
	
	expect(response.status).toBe(400);
	expect(response.body).toMatchObject({
		error: "Failed to create task"
	})
	
});

it("Should return status 400 when send data without any properties", async () => {
	const data = {
		
	};
	
	const response = await request("http://localhost:3000").post("/api/task").send(data).set("Accept", "application/json");
	
	expect(response.status).toBe(400);
	expect(response.body).toMatchObject({
		error: "Failed to create task"
	})
	
});

it("Should return status 400 when send data without status propertie", async () => {
	const data = {
		"title": "jest test",
		"description": "test with jest"
	};
	
	const response = await request("http://localhost:3000").post("/api/task").send(data).set("Accept", "application/json");
	
	expect(response.status).toBe(400);
	expect(response.body).toMatchObject({
		error: "Failed to create task"
	})
	
});

it("Should return status 400 when send data without description propertie", async () => {
	const data = {
		"title": "jest test",
		"status": "Pendente"
	};
	
	const response = await request("http://localhost:3000").post("/api/task").send(data).set("Accept", "application/json");
	
	expect(response.status).toBe(400);
	expect(response.body).toMatchObject({
		error: "Failed to create task"
	})
	
});

it("Should return status 400 when send data without title propertie", async () => {
	const data = {
		"description": "test with jest",
		"status": "Pendente"
	};
	
	const response = await request("http://localhost:3000").post("/api/task").send(data).set("Accept", "application/json");
	
	expect(response.status).toBe(400);
	expect(response.body).toMatchObject({
		error: "Failed to create task"
	})
	
});

it("Should update a data existent", async () => {
	const data = {
		"status": "Em andamento"
	};
	
	const response = await request("http://localhost:3000").put("/api/tasks/64fcf86560322a6f2a3d8186").send(data).set("Accept", "application/json");
	
	expect(response.status).toBe(200);
	expect(response.body).toMatchObject({
		msg: "Task as updated"
	})
	
});

it("Should return status 404 when try update a data non-existent", async () => {
	const data = {
		"status": "Em andamento"
	};
	
	const response = await request("http://localhost:3000").put("/api/tasks/64fcf86560322a6f2a3d8190").send(data).set("Accept", "application/json");
	
	expect(response.status).toBe(404);
	expect(response.body).toMatchObject({
		error: "Task not found"
	})
	
});

it("Should delete data aready existent", async () => {
	const response = await request("http://localhost:3000").delete("/api/tasks/6504bd4bbd89edb3062cd61a");
	
	expect(response.status).toBe(200);
	expect(response.body).toMatchObject({
		msg: "Task deleted"
	})
	
});

it("Should return status 404 when try delete a data non-existent", async () => {
	
	const response = await request("http://localhost:3000").put("/api/tasks/64fcf86560322a6f2a3d8190");
	
	expect(response.status).toBe(404);
	expect(response.body).toMatchObject({
		error: "Task not found"
	})
	
});