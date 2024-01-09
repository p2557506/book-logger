import express, { response } from "express"
import mysql from "mysql"
import cors from "cors"

import bcrypt, { hash } from "bcrypt"

const saltRounds = 10

const app = express();

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"book_logger_db"
})

//Middleware to accept json as body object to requests
app.use(express.json())
app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials:true
        
    }
))
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

app.get("/books/:id", (req,res)=>{
    const bookId = req.params.id
    const q = "SELECT * FROM books WHERE id = ?"
    db.query(q,[bookId],(err,data)=>{
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
/////

//Backlog DB
app.get("/backlog", (req,res)=>{
    const q = "SELECT * FROM backlog"
    
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/backlog", (req,res)=>{
    const q = "INSERT INTO backlog(`title`,`desc`,`cover`) VALUES (?)"
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
/////

//Wishlist DB
app.get("/wishlist", (req,res)=>{
    const q = "SELECT * FROM wishlist"
    
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})


app.post("/wishlist", (req,res)=>{
    const q = "INSERT INTO wishlist(`title`,`desc`,`cover`) VALUES (?)"
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

////

//Users DB
app.get("/users", (req,res)=>{
    const q = "SELECT * FROM users"
    
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/users/:id", (req,res)=>{
    const userId = req.params.id
    const q = "SELECT * FROM users WHERE id = ?"
    db.query(q,[userId],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/signup", (req,res)=>{
    const q = "INSERT INTO users(`username`,`password`) VALUES (?,?)"
    const username = req.body.username;
    const password = req.body.password;
    bcrypt.hash(password,saltRounds,(err, hash) => {
        if(err) {
            console.log(err)
        }
        db.query(q,[username,hash],(err,data)=>{
            if(err) return res.json(err)
            return res.json(data)
        })
    })
})

app.post("/auth", async (req,res) =>{
    const q = "SELECT * FROM users WHERE username = ?"
    const username = req.body.username;
    const password = req.body.password;
    //Check if user exists

    await db.query(q,[username],(err,data)=>{
        if(err){
            return res.json(err)

        }
        if(data.length > 0){
            bcrypt.compare(password,data[0].password,(err,result) => {
                if(result){
                    res.json(data)
                } else{
                    res.status(400).json({err:"Wrong Combination"})
                } 
            });

            
        } else{
            res.status(400).json({err:"User Doesn't Exist"})
        }
    })
    
})


app.listen(8800, ()=>{
    console.log("Wishlist,Backlog and Archive Books")
})