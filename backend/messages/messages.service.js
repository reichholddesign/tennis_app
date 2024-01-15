const mysql = require("mysql");


const getPublicMessage = () => {
  return {
    text: "This is a public message.",
  };
};

const getProtectedMessage = () => {

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:process.env.PASSWORD,
    database:"tennis_app", 
})

    const q = 'SELECT * FROM opponents';
  const result =  db.query(q, (err,data)=>{
    if(err) return err
    return data
   })

   console.log(result)
   return {
    text: "This is an admin message.",
  };
};

const getAdminMessage = () => {
  return {
    text: "This is an admin message.",
  };
};

module.exports = {
  getPublicMessage,
  getProtectedMessage,
  getAdminMessage,
};
