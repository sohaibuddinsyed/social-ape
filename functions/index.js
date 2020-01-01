const functions = require('firebase-functions');

//Express is used to handle different functionalities via same end point
const express=require('express');
const app=express();

const{db}=require('./util/admin');

const FBAuth= require('./util/fbAuth');

const {getAllScreams,
    postOneScream,
    getScream,
    commentOnScream,
    likeScream,
    unlikeScream,
    deleteScream
} = require('./handlers/screams');
const {signup, 
    login, 
    uploadImage, 
    addUserDetails, 
    getAuthenticatedUser,
    getUserDetails,
    markNotificationsRead
} = require('./handlers/users');

//Scream Routes
app.get('/screams', getAllScreams);
app.post('/screams',FBAuth, postOneScream);
app.get('/screams/:screamId', getScream);
app.post('/screams/:screamId/comment', FBAuth,commentOnScream);
app.get('/screams/:screamId/like', FBAuth,likeScream);
app.get('/screams/:screamId/unlike', FBAuth,unlikeScream);
app.delete('/screams/:screamId', FBAuth,deleteScream);

//user routes
app.post('/signup', signup);
app.post('/login',login);
app.post('/user/image',FBAuth,uploadImage);
app.post('/users',FBAuth, addUserDetails);
app.get('/users',FBAuth, getAuthenticatedUser);
app.get('/users/:handle',getUserDetails);
app.post('/notifications',FBAuth,markNotificationsRead);


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

exports.createNotificationOnLike= functions
.region('us-central1')
.firestore.document('likes/{id}')
.onCreate( (snapshot)  =>{
    db.doc(`/screams/${snapshot.data().screamId}`).get()
    .then(doc =>{
        if(doc.exists){
            return db.doc(`/notifications/${snapshot.id}`).set({
                createdAt: new Date().toISOString(),
                recipient:doc.data().userHandle,
                sender: snapshot.data().userHandle,
                type: 'like',
                read: false,
                screamId: doc.id
            });
        }
    })
    .then( ()=>{
        return;
    })
    .catch((err) =>{
        console.error(err);
        return;
    });

});

exports.deleteNotificationOnUnlike = functions
.region('us-central1')
.firestore.document('likes/{id}')
.onDelete((snapshot) =>{
    db.doc(`/notifications/${snapshot.id}`)
    .delete()
    .then(()=>{
        return;
    })
    .catch((err) =>{
        console.error(err);
    });
});

exports.createNotificationOnComment = functions
.region('us-central1')
.firestore.document('comments/{id}')
.onCreate((snapshot) =>{
    db.doc(`/screams/${snapshot.data().screamId}`)
    .get()
    .then( (doc) =>{
        if(doc.exists){
            return db.doc(`/notifications/${snapshot.id}`).set({
                createdAt: new Date().toISOString(),
                recipient: doc.data().userHandle,
                sender: snapshot.data().userHandle,
                type: 'comment',
                read: false,
                screamId: doc.id
            });
        }
    })
    .then( ()=>{
        return;
    })
    .catch((err) =>{
        console.error(err);
        return;
    });


});
