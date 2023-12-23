import express from "express"
import mysql from "mysql"

const app = express();

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"book_logger_db"
})

//Make api request using express server

app.get("/", (req,res)=>{
    res.json("hello thi is backend")
})

app.listen(8800, ()=>{
    console.log("Wishlist,Backlog and Archive Books")
})