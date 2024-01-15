const db = require("../config/db");


module.exports = {
    getProfile: async (req, res) => {
      try {
        const user = req.body
        const userId = user.userId.split("|")[1]

        const checkUserExistence = (db, userId) => {
          return new Promise((resolve, reject) => {
            const checkQuery = 'SELECT * FROM users WHERE user_id = ?';
            db.query(checkQuery, [userId], (err, data) => {
              if (err) {
                reject(err);
              } else {
                resolve(data);
              }
            });
          });
        };
        
        const insertUser = (db, userId, givenName, familyName) => {
          return new Promise((resolve, reject) => {
            const insertQuery = 'INSERT INTO users (user_id, first_name, last_name) VALUES (?, ?, ?)';
            const values = [userId, givenName, familyName];
            db.query(insertQuery, values, (err, data) => {
              if (err) {
                reject(err);
              } else {
                resolve(data);
              }
            });
          });
        };
        
        const addUser = async (db, userId, user) => {
          try {
            const data = await checkUserExistence(db, userId);
            if (data.length === 1) {
              return data[0];
            } else if (count === 0) {
              await insertUser(db, userId, user.given_name, user.family_name);
              return 'Successfully added';
            }
          } catch (error) {
            return error;
          }
        };
        
        // Usage
        try {
          const result = await addUser(db, userId, user);
          res.json(result);
        } catch (error) {
          res.json(error);
        }
        

      } catch (err) {
        console.log(err);
      }
    },

    profileUpdate: async (req, res) => {
     try{
      console.log(req.body.user_id)
      let profile = req.body
      const userId = req.body.user_id.split("|")[1]

      const updateSql = `
      UPDATE users
      SET
        first_name = IFNULL(?, first_name),
        last_name = IFNULL(?, last_name),
        dob = IFNULL(?, dob),
        height = IFNULL(?, height),
        gender = IFNULL(?, gender),
        specified_gender = IFNULL(?, specified_gender),
        hand = IFNULL(?, hand),
        rating = IFNULL(?, rating)
      WHERE user_id = ?;
      `;
    
    // Execute the update query
    db.query(updateSql, [profile.first_name, profile.last_name, profile.dob, profile.height, profile.gender,profile.specified_gender, profile.hand, profile.rating, userId], (err, results) => {
      if (err) {
        console.error('Error updating the record: ' + err.stack);
        return;
      }
      res.status(200).send('Update successful');
    })

    }
    catch(err){
      console.log(err)
    }
  }
}