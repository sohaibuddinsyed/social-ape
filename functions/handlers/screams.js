const {db} = require('../util/admin');

exports.getAllScreams = (req,res)=>{
    db.collection('screams')
    .orderBy('createdAt','desc')
    .get()
    .then(data=>{
        let screams=[];

        //Taking the data from DB server and far each document(scream) pushing 
        //the coreesponding content onto array.
        //Initially we used  {screams.push(doc.data());} to get entire scream data 
        //now we take only required information
        data.forEach( doc=>{
            screams.push({
                screamId:doc.id,
                body: doc.data().body,
                userHandle:doc.data().userHandle,
                createdAt:doc.data().createdAt

            });       
        });
        return res.json(screams);           //DB returns json ofscreams 
    })
    .catch((err)=>console.error(err));
}

exports.postOneScream = (req,res)=>{
  
    const newScream={                           //Object type of the new scream to be added  
        body:req.body.body,
        userHandle:req.user.handle,
        createdAt:new Date().toISOString()

    }; 
    db
    .collection('screams')
    .add(newScream)
    .then((doc)=>{
        res.json({message:`document ${doc.id} created successfully `})
    })
    .catch(err=>{
        res.status(500).json({error:`something went wrong`});
        console.error(err);
    });
}