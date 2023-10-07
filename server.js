const express=require("express")
const connect = require("./config/connectDB")

//create instance
const app=express()
// middleware

app.use(express.json())

//require dotenv

require('dotenv').config()

//connecting to DB
connect()

//create PORT
const PORT=process.env.PORT

//create server
app.listen(PORT, (error)=>{
    error?
    console.log(error)
    :console.log(`server is running on PORT ${PORT}`)
})


app.use("/api/users",require('./Routes/userroute'))