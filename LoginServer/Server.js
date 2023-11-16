const express = require('express');
const mongoose = require('mongoose');
//const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = 5000;


app.use(cors());
app.use(express.json())

//connect mongo db with mongoose
mongoose.connect(process.env.MONGODB_URI).then((res)=>{
  console.log("MongoDB Connected")
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });