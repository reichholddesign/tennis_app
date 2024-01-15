// import express from "express";
// import mysql from "mysql";
// import cors from "cors";
// import morgan from "morgan";
// import helmet from "helmet";
// import nocache from "nocache";
// import { auth, requiredScopes } from 'express-oauth2-jwt-bearer';
// import dotenv from 'dotenv';
// import  messagesRouter from "./messages/messages.router";
// // import  errorHandler from "./middleware/error.middleware";
// // import  notFoundHandler from "./middleware/not-found.middleware";

// dotenv.config();


// const app = express();
// const apiRouter = express.Router();

// app.use(express.json());
// app.set("json spaces", 2);

// app.use(
//   helmet({
//     hsts: {
//       maxAge: 31536000,
//     },
//     contentSecurityPolicy: {
//       useDefaults: false,
//       directives: {
//         "default-src": ["'none'"],
//         "frame-ancestors": ["'none'"],
//       },
//     },
//     frameguard: {
//       action: "deny",
//     },
//   })
// );

// app.use((req, res, next) => {
//   res.contentType("application/json; charset=utf-8");
//   next();
// });
// app.use(nocache());

// app.use(
//   cors({
//     origin: process.env.CLIENT_ORIGIN_URL,
//     methods: ["GET"],
//     allowedHeaders: ["Authorization", "Content-Type"],
//     maxAge: 86400,
//   })
// );

// app.use("/api", apiRouter);
// apiRouter.use("/messages", messagesRouter);

// app.use(errorHandler);
// app.use(notFoundHandler);

// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`);
// });



// // const app = express();

// // const checkJwt = auth({
// //     audience: 'http://localhost:8880',
// //     issuerBaseURL: `https://dev-ujoatv61ipcd1pi0.us.auth0.com/`,
// //   });

// // const db = mysql.createConnection({
// //     host:"localhost",
// //     user:"root",
// //     password:process.env.PASSWORD,
// //     database:"tennis_app", 
// // })

// // app.use(express.json())
// // app.use(morgan("dev"));
// // app.use(helmet());
// // app.use(cors())

  
// // // This route needs authentication
// // app.get('/api/private', checkJwt, function(req, res) {
// //     res.json({
// //       message: 'Hello from a private endpoint! You need to be authenticated to see this.'
// //     });
// //   });


// // app.get("/profiles", (req,res) => {
// //     const q = 'SELECT * FROM profiles';
// //    db.query(q, (err,data)=>{
// //     if(err) return res.json(err)
// //     return res.json(data)
// //    })
// // })

// // app.post("/opponents", (req,res) => {
// //     const q = "INSERT INTO opponents (`name`) VALUES (?)"
// //     const values = [req.body.name];

// //     db.query(q, values, (err,data) => {
// //         if(err) return res.json(err)
// //         return res.json("Opponent has been succesfully added")
// //     })
// // })


// // app.listen(process.env.PORT, () => {
// //     console.log('connected to backend!')
// // })


curl --request GET \
  --url http:/localhost:8080/api/messages/protected \
  --header 'authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNpZ2xWQ0Z2eWg1X1QwNWlLSWtraiJ9.eyJpc3MiOiJodHRwczovL2Rldi11am9hdHY2MWlwY2QxcGkwLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJjRks2bTdzNVEwb1VINnRIVVd3djY3bjBJdmhVbFJ6TUBjbGllbnRzIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo4ODgwIiwiaWF0IjoxNzAyNDQ3NzE1LCJleHAiOjE3MDI1MzQxMTUsImF6cCI6ImNGSzZtN3M1UTBvVUg2dEhVV3d2NjduMEl2aFVsUnpNIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.zWJFYQZtpSGlUjgf8jCemF_wn-FJr4XhpPaWvUdJ3B5we9jktzCdT_jZ96JYfKbl2tSU6VJlpY4c8PJFJ_TcK0jF7uLXf-0NNv46K8hSUTbU_F6TrQOYchssfTkpHDxOA2kLF-IILBOiaP0RKGhjnRLkDa6FiwF_SGs7mMSZGxDZFT6hJIwOomwjwo8wJQBNn3KuBRRpCY8SKFI1fX2eQ3mgd5r3dDxS1jjuskrrAwH2G7lFsjSMfXNofvi9wfqRbc8UaxxhHp3o2kXuA5bbR8yH1sOIf7DES7BDTAgzc48YYe7gN_9uuEGmmi2Mh6k0VLXf2bScj01Pit6b_Uc-uw'