
let _id = 0;
class Post {
    constructor(author, createdAt, photoLink, likes, description, hashTags) {
        this.id = String(_id++);
        this.createdAt = createdAt;
        this.photoLink = photoLink;
        this.author = author;
        this.description = description;
        this.hashTags = hashTags;
        this.likes = likes;
    }
}


const Users = [
    {
        username: "StefanoGrande",
        password: "111"
    },
    {
        username: "AnnaMaria",
        password: "222"
    },
    {
        username: "1",
        password: "1"
    }
]

const filterConfig = {
    fromDate: "",
    toDate: "",
    author: "",
    hashTags: []
};

const photoPosts = [];

for (method in ServerModule) {
    photoPosts.__proto__[method] = ServerModule[method];
}


photoPosts.addPhotoPost(new Post('AnnaMaria', new Date(1800, 14, 18, 23, 12), 'pic/barokko1.jpg', ['AnnaMaria', 'MarioValentino'], 'Where my prince on a white horse?', ['#InCastle', '#WaitingForPrince']));
photoPosts.addPhotoPost(new Post('AnnaMaria', new Date(1820, 11, 18, 23, 12), 'pic/barokko2.jpg', ['StefanoGrande'], 'How to get rid of rats in the house?', ['#InCastle', '#HateRats']));
photoPosts.addPhotoPost(new Post('StefanoGrande', new Date(1810, 10, 16, 20, 12), 'pic/barokko.jpg', ['AnnaMaria', 'MarioValentino',], 'War.... war never changes', ['#InCastle', '#HateWar']));
photoPosts.addPhotoPost(new Post('MarioValentino', new Date(1850, 10, 16, 20, 12), 'pic/barokko4.jpg', ['AnnaMaria'], 'Again I lost the crop', ['#NotInCastle', '#NeedJob', '#GodBlessKing']));
photoPosts.addPhotoPost(new Post('AnnaMaria', new Date(1810, 10, 16, 20, 12), 'pic/barokko3.jpg', ['AnnaMaria'], 'War.... war never changes', ['#InCastle', '#HateWar']));
photoPosts.addPhotoPost(new Post('StefanoGrande', new Date(1910, 10, 16, 20, 12), 'pic/exadel.jpg', ['AnnaMaria'], 'War.... war never changes', ['#InCastle', '#HateWar']));
photoPosts.addPhotoPost(new Post('MarioValentino', new Date(1930, 10, 16, 20, 12), 'pic/exadel1.jpg', ['AnnaMaria'], 'War.... war never changes', ['#InCastle', '#HateWar']));
photoPosts.addPhotoPost(new Post('StefanoGrande', new Date(1900, 10, 16, 20, 12), 'pic/exadel2.jpg', ['AnnaMaria', 'StefanoGrande'], 'War.... war never changes', ['#InCastle', '#HateWar']));
photoPosts.addPhotoPost(new Post('AnnaMaria', new Date(1950, 10, 16, 20, 12), 'pic/exadel.jpg', ['AnnaMaria', 'StefanoGrande'], 'War.... war never changes', ['#InCastle', '#HateWar']));
photoPosts.addPhotoPost(new Post('StefanoGrande', new Date(1990, 10, 16, 20, 12), 'pic/order.jpg', ['AnnaMaria'], 'War.... war never changes', ['#InCastle', '#HateWar']));
photoPosts.addPhotoPost(new Post('AnnaMaria', new Date(2000, 10, 16, 20, 12), 'pic/exadel2.jpg', ['AnnaMaria'], 'War.... war never changes', ['#InCastle', '#HateWar']));

console.log(JSON.stringify(photoPosts));
if (!localStorage.users) localStorage.users = JSON.stringify(Users);
if (!localStorage.photoPosts) localStorage.photoPosts = JSON.stringify(photoPosts);
if (!localStorage.state) localStorage.state = "1";
if (_id) _id = JSON.parse(localStorage.photoPosts).length + 1;



function display() {

    switch (localStorage.state) {

        case "1": {
            DisplayLogIn();
            break;
        }

        case "2": {
            DisplayFeed();
            displayPosts();
            dom.displayUserInfo(localStorage.user);
            break;
        }

        case "3": {
            DisplayAddForm();
            break;
        }
    }
}


display();


