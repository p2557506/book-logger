import express, { response } from "express"
import mysql from "mysql2"
import cors from "cors"
import cookeieParser from "cookie-parser"
import jwt from "jsonwebtoken"
import multer from "multer"
import path from "path"
import { configDotenv } from "dotenv"

import * as bcrypt from "bcryptjs"

const saltRounds = 10
 

const app = express();

//URL For railway
//const urlDB = `mysql://root:vauhnLFZUafxImRXqknKEQRhnfLfCiDZ@mysql.railway.internal:3306/railway`
//const urlDB = `mysql://root:password@localhost:3306/book_logger_db`
 const db = mysql.createConnection({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    debug: false,
    port: process.env.DB_PORT
 }) 

 db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to the database');
    }
});

//Local now no longer is functional
//const db = mysql.createConnection(urlDB)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req,file,cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage:storage
})

//Middleware to accept json as body object to requests
app.use(express.json())
app.use(cookeieParser())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.static("public"));

//JWT Section
//Create Token
const createTokens = (user) => {
    //3 Arguments taken by token
    //Mixed up sercet/ Create .env file for secret
    
    const accessToken = jwt.sign({
        username: user.username,
        avatarImg: user.avatarImg
        

    },
    "changelater"
    );
    return accessToken

}
//Validate Token
const validateToken = (req,res,next) => {
    const token = req.cookies.token

    if(!token) return res.status(400).json({err:"User Not Authenticated"})

    
        //Boolean
        jwt.verify(token,"changelater", (err,decoded) => {

            if(err){
                return res.json({err: "token please boay"})
            } else{
                
                req.username = decoded.username
                req.id = decoded.id
                req.avatarImg= decoded.avatarImg

                
                
                next();
            }
        })
   
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
    const q = "CALL get_user_backlogs()";
    
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

app.get("/userBacklog/:id", (req,res)=>{
    const q = "SELECT user_id,title,cover FROM wbstorage_item INNER JOIN books ON wbstorage_item.book_item_id = books.id INNER JOIN wbstorage ON wbstorage_item.wb_id = wbstorage.id WHERE uid = ?";
    const userId = req.params.id
    db.query(q,[userId],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

//ADD Book TO Backlog
//STEPS:
//1) Push USER ID TO TO WB STORAGE
//2) TRIGGER PUSH ID AND USER
app.post("/userOrder/:id", (req,res)=>{
    const q = "INSERT INTO wbstorage(`uid`) VALUES (?)"
    const userId = req.params.id
    
    db.query(q,[userId],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

//All Backlog Orders

app.get("/backlogOrders/:uid", (req,res)=>{
    const q = "SELECT * FROM backlogOrders WHERE uid = ?"
    const userId = req.params.uid
    db.query(q,[userId],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/backlogOrderPush", (req,res)=>{
    const q = "INSERT INTO backlogOrders(`uid`,`book_id`,`title`,`descrip`,`cover`) VALUES (?)"
    const values = [
        req.body.uid,
        req.body.book_id,
        req.body.title,
        req.body.descrip,
        req.body.cover,
    ]
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.delete("/removeBookBacklog/:id",(req,res) =>{
    const bookId = req.params.id
    const q = "DELETE from backlogOrders WHERE book_id = ?"

    db.query(q,[bookId], (err,data) =>{
        if(err) return res.json(err);
        return res.json(data)
    })
})

/////

//Wishlist DB

//All Wishlist Orders
app.get("/wishlistOrders/:uid", (req,res)=>{
    const q = "SELECT * FROM wishlistOrders WHERE uid = ?"
    const userId = req.params.uid
    db.query(q,[userId],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/wishlistOrderPush", (req,res)=>{
    const q = "INSERT INTO wishlistOrders(`uid`,`book_id`,`title`,`descrip`,`cover`) VALUES (?)"
    const values = [
        req.body.uid,
        req.body.book_id,
        req.body.title,
        req.body.descrip,
        req.body.cover,
    ]
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.delete("/removeBookWishlist/:id",(req,res) =>{
    const bookId = req.params.id
    const q = "DELETE from wishlistOrders WHERE book_id = ?"

    db.query(q,[bookId], (err,data) =>{
        if(err) return res.json(err);
        return res.json(data)
    })
})

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

app.get("/wishlist/:id", (req,res)=>{
    const q = "SELECT title,cover,user_id FROM wishliststorage_item INNER JOIN books ON wishliststorage_item.book_id = books.id INNER JOIN wishliststorage ON wishliststorage_item.wishliststorage_id = wishliststorage.id WHERE user_id = ?";
    const userId = req.params.id
    db.query(q,[userId],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
////


//All Completed Orders
app.get("/completedOrders/:uid", (req,res)=>{
    const q = "SELECT * FROM completedOrders WHERE uid = ?"
    const userId = req.params.uid
    db.query(q,[userId],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/completedOrderPush", (req,res)=>{
    const q = "INSERT INTO completedOrders(`uid`,`book_id`,`title`,`descrip`,`cover`) VALUES (?)"
    const values = [
        req.body.uid,
        req.body.book_id,
        req.body.title,
        req.body.descrip,
        req.body.cover,
    ]
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.delete("/removeBookCompleted/:id",(req,res) =>{
    const bookId = req.params.id
    const q = "DELETE from completedOrders WHERE book_id = ?"

    db.query(q,[bookId], (err,data) =>{
        if(err) return res.json(err);
        return res.json(data)
    })
})

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
                    const payload = {"username":data[0].username,"id":data[0].id,"avatarImg":data[0].avatarImg}
                    const token = jwt.sign(payload, "changelater",{expiresIn:'1d'})

                    //Access token stores as cookie to remember user
                    res.cookie("token",token,{
                        maxAge: 60 * 60 * 24 * 30 * 1000,
                        
                    })
                    
                    res.json(data[0]);
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

app.get("/logout" , (req,res) => {
    res.clearCookie('token')
    return res.json({status: "logged out"})
})

app.get("/profile", validateToken,(req,res) =>{
    //Send token in request and token is stored in frontend
    //Determne if user is authenticated
    return res.json({status: "logged in" , username:req.username, id:req.id, avatarImg:req.avatarImg});
})

app.put("/profile/:id", (req,res) => {
    const userId = req.params.id;
    const q = "UPDATE users SET `username` = ?, `avatarImg` = ? WHERE id = ?";

    const values = [
        req.body.username,
        req.body.avatarImg
    ]

    db.query(q,[...values,userId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("User profile has been updated")
    })

})

//UPLOAD USER AVATAR CODE BELOW

app.post("/upload/:id",upload.single("image"), (req,res) =>{
    
    const image = req.file.filename
    
    
    const q = "UPDATE users SET `avatarImg` = ? WHERE id = ?";
    const userId = req.params.id;
    db.query(q, [image,userId], (err,data) => {
        if(err) return res.json({msg: "error"})
        return res.json({Status: "win"})
    })
})

//Number Of books by genre
app.get("/genre/:type", (req,res)=>{
    const genre = req.params.type
    const q = "SELECT COUNT(id) AS count FROM books WHERE genre = ?;"
    db.query(q,[genre],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

const port = process.env.PORT || 8800

app.listen(port, ()=>{
    console.log("Wishlist,Backlog and Archive Books")
})