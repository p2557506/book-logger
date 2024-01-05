import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express();

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"book_logger_db"
})

//Middleware to send data to express server
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
    const q = "INSERT INTO users(`username`,`password`) VALUES (?)"
    const values = [
        req.body.username,
        req.body.password,
        
    ]
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})


app.listen(8800, ()=>{
    console.log("Wishlist,Backlog and Archive Books")
})