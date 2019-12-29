const functions = require('firebase-functions');

//Express is used to handle different functionalities via same end point
const express=require('express');
const app=express();

const FBAuth= require('./util/fbAuth');

const {getAllScreams,postOneScream}=require('./handlers/screams');
const {signup, login, uploadImage}=require('./handlers/users');

//Scream Routes
app.get('/screams', getAllScreams);
app.post('/screams',FBAuth, postOneScream);

//user routes
app.post('/signup', signup);
app.post('/login',login);
app.post('/user/image',FBAuth,uploadImage);





//Function that sends Helloworld to server
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello World!");
// });

//Function that inputs screams from DB server
// exports.getScreams = functions.https.onRequest((req,res)=>{
//     admin.firestore().collection('screams').get()
//     .then(data=>{
//         let screams=[];
//         data.forEach( doc=>{
//             screams.push(doc.data());       
//         });
//         return res.json(screams);           //DB returns json ofscreams 
//     })
//     .catch((err)=>console.error(err));
// })

//Function to create scream in DB cloud server
// exports.createScream = functions.https.onRequest((req,res)=>{
//     if(req.method !== 'POST'){
//         return res.status(400).json({error:`Method not allowed`});
//     }
//     const newScream={                           //Object type of the new scream to be added  
//         body:req.body.body,
//         userHandle:req.body.userHandle,
//         createdAt: admin.firestore.Timestamp.fromDate(new Date())
//     };
//     admin.firestore()
//     .collection('screams')
//     .add(newScream)
//     .then(doc=>{
//         res.json({message:`document ${doc.id} ceated successfully `})
//     })
//     .catch(err=>{
//         res.status(500).json({error:`something went wrong`});
//         console.error(err);
//     })

// });




//signup route

    
//https://baseurl/screams      no
//https://baseurl/api/screams  yes
//chained up region to minimise latency
exports.api=functions.https.onRequest(app);


// $env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\DELL\Downloads\Social Media App-aff5235d3239.json"


