const express = require("express");
const dbconnection = require("./db/connectdb");
require("dotenv").config();
const app = express();
const cors = require('cors')
const cookieparser= require('cookie-parser');

dbconnection();
app.use('/uploads',express.static("uploads"))

app.use(express.json())
app.use(cookieparser())
app.use(express.urlencoded({extended:true}))
const coreoptions= {
    origin:'http://localhost:4173',
    credentials:true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
}
app.use(cors(coreoptions))
app.use('/api/user',require('./routes/userRoutes'))
app.use('/api/email',require('./routes/emailroutes'))
app.listen(process.env.PORT, () => {
  console.log(`server is running on this ${process.env.PORT}`);
});



