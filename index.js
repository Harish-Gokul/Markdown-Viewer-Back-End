const fs = require("fs")
const express = require("express");
const Joi = require("joi")
const app = express();
const cors = require("cors");
const { connect } = require("http2");
const md = require("./routes/md")
  
app.use(express.json())
app.use(cors())

app.use("/",md)



const port = process.env.PORT ||3000;
app.listen(port,()=> console.log("Port is Working Fine"))