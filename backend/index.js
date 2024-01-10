import express, { response } from "express"
import mysql from "mysql"
import cors from "cors"
import cookeieParser from "cookie-parser"
import jwt from "jsonwebtoken"

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
app.use(cookeieParser())
app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials:true
        
    }
))

//JWT Section
//Create Token
const createTokens = (user) => {
    //3 Arguments taken by token
    //Mixed up sercet/ Create .env file for secret
    const accessToken = jwt.sign({
        username: user.username,
        id:user.id

    },
    "changelater"
    );
    return accessToken

}
//Validate Token
const validateToken = (req,res,next) => {
    const accessToken = req.cookies["access-token"]

    if(!accessToken) return res.status(400).json({err:"User Not Authenticated"})

    try {
        //Boolean
        const validToken = jwt.verify(accessToken,"changelater")
        if(validToken){
            req.authentic = true;
            return next()
        }
    } catch (error) {
        res.status(400).json({error:error})
    }
}
/////

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
                    //data[0] is user in this scenario
                    //Access token created using username and id with secret key
                    const at = createTokens(result)
                    //Access token stores as cookie to remember user
                    res.cookie("access-token",at,{
                        maxAge: 60 * 60 * 24 * 30 * 1000,
                        
                    })
                    
                    res.json(data);
                    //JWT Token when browser is closed stay logged in
                    //Never store cookie on local or session storage
                } else{
                    res.status(400).json({err:"Wrong Combination"})
                } 
            });

            
        } else{
            res.status(400).json({err:"User Doesn't Exist"})
        }
    })
    
})

app.get("/profile", validateToken,(req,res) =>{
    //Send token in request and token is stored in frontend
    //Determne if user is authenticated
    res.json("Logged in");
})


app.listen(8800, ()=>{
    console.log("Wishlist,Backlog and Archive Books")
})