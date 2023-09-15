const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger.json");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const conn = require("./src/database/conn");
conn();

const routes = require("./src/routes/router");
app.use("/api", routes);

app.listen(3000, function(){
	console.log("Server is running !");
});

//e1VKlFdoownKZ3D3
//PJvuU05BQvz4aYni