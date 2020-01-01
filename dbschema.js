//Creating a local DB to minimise fetching from DB cloud server
let db={
    users:[
        {
            userId:'akdjaijcoiau983987393 ',
            email:'123@gmail.com',
            handle:'user',
            createdAt:'' , 
            imageUrl:'',
            bio:'',
            website:'',
            location:''
        }
    ],
    screams:[
        {
            userHandle:'user',
            body:'This is body',
            createdAt:"2019-12-24T04:30:14.101Z",
            likeCount :5,
            commentCount:2
        }

    ],
    comments:[
        {
        userHandle:'user',
        screamId:'sdfadfdcvdv',
        body:'This is a comment',
        createdAt:"2019-12-24T04:30:14.101Z"
        }
    ],
    nitifications:[
        {
            recipient:"user 2",
            sender:"user 1",
            read:"true | false",
            screamId:"sjdhfsi87fwou",
            type:"like | comment",
            createdAt:"2019-12-24T04:30:14.101Z"
        }
    ]
};

const userDetails = {
    //Redux data
    credentials:{
        userId:'akdjaijcoiau983987393 ',
            email:'123@gmail.com',
            handle:'user',
            createdAt:'' , 
            imageUrl:'',
            bio:'',
            website:'',
            location:''
    },
    likes: [
        {
            userHandle: 'user',
            screamId:"adadq3r4wtdth"
        },
        {
            userHandle: 'user',
            screamId:"pok08kpoi76d"
        }

    ]
}