const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const _log = console.log;
const cors = require('cors');

const PORT = process.env.PORT;
const DBNAME = process.env.DB;
const app = express();
app.use(express.json());
app.use(cors());

_log(process.env.URI);

// DB Schema
const clientSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  description: String
});
// DB model
const newClientModel = mongoose.model(DBNAME, clientSchema);

async function pushDB(req){
  const newClient = new newClientModel({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    description: req.body.description
  })
  await mongoose.connect(process.env.URI);
  await newClient.save();
  mongoose.connection.close();
}


/**
 * Form data comes in the following format:
 * {
 *  "name",
 *  "phone",
 *  "email",
 * "description"
 * }
 */

app.post("/contact", (req, res) => {
  pushDB(req);
});

  
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);