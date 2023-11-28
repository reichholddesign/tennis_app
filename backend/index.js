import express from "express";
import mysql from "mysql"
import cors from "cors"
import dotenv from 'dotenv'
dotenv.config();

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:process.env.PASSWORD,
    database:"tennis_app", 
})

app.use(express.json())
app.use(cors())

app.get("/", (req,res) => {
    res.json('hello this is the backend')
})


app.get("/opponents", (req,res) => {
    const q = 'SELECT * FROM opponents';
   db.query(q, (err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
   })
})

app.post("/opponents", (req,res) => {
    const q = "INSERT INTO opponents (`name`) VALUES (?)"
    const values = [req.body.name];

    db.query(q, values, (err,data) => {
        if(err) return res.json(err)
        return res.json("Opponent has been succesfully added")
    })
})


app.listen(process.env.PORT, () => {
    console.log('connected to backend!')
})