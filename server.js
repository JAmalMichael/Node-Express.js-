const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbconnection");

const port = 5000;

const app = express();

//connectDb();

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use(errorHandler);
app.use("/api/users", require("./routes/userRoute"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
