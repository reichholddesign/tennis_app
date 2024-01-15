const express = require("express");
const {
  getAdminMessage,
  getProtectedMessage,
  getPublicMessage,
} = require("./messages.service");
const { validateAccessToken } = require("../middleware/auth0.middleware.js");
const mysql = require("mysql");


const messagesRouter = express.Router();

messagesRouter.get("/public", (req, res) => {
  const message = getPublicMessage();

  res.status(200).json(message);
});

messagesRouter.get("/protected", validateAccessToken, (req, res) => {
  // const message = getProtectedMessage();

  const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:process.env.PASSWORD,
    database:"tennis_app", 
})

    const q = 'SELECT * FROM opponents';
   db.query(q, (err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
   })

});

messagesRouter.get("/admin", validateAccessToken, (req, res) => {
  const message = getAdminMessage();

  res.status(200).json(message);
});

module.exports = { messagesRouter };
