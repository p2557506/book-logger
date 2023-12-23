import express from "express"
import mysql from "mysql"

const app = express();

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"book_logger_db"
})

//Middleware to send data to express server
app.use(express.json())
//Make api request using express server

app.get("/", (req,res)=>{
    res.json("hello this is backend")
})
//Grab All Books in DB
app.get("/books", (req,res)=>{
    const q = "SELECT * FROM books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books",(req,res)=>{
    const q= "INSERT INTO books(`title`,`desc`,`cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
    ]
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.listen(8800, ()=>{
    console.log("Wishlist,Backlog and Archive Books")
})