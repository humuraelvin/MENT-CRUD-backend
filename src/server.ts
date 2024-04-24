import router from "./routes/routes";

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const dbConnection = require('./db/dbConn')


const app = express();
app.use(express.json());


dbConnection();

app.use('/',router);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
    
})