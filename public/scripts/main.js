
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

const photoPosts = [];

for (method in ServerModule) {
    photoPosts.__proto__[method] = ServerModule[method];
}


const filterConfig = {
    fromDate: "",
    toDate: "",
    author: "",
    hashTags: []
};

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


if (!localStorage.users) localStorage.users = JSON.stringify(Users);
if (!localStorage.photoPosts) localStorage.photoPosts = JSON.stringify(photoPosts);
if (!localStorage.state) localStorage.state = "1";
if (_id) _id = JSON.parse(localStorage.photoPosts).length + 1;



function displayPosts() {
    const posts = JSON.parse(localStorage.photoPosts);
    const feed = document.getElementsByClassName("feed")[0];
    feed.innerHTML = ``;

    dom.displayPosts(posts.getPhotoPosts(undefined, undefined, filterConfig));
    document.getElementsByClassName("btn-load-more")[0].style.display = "block";
}

function addPhotoPost(post) {
    const posts = JSON.parse(localStorage.photoPosts);
    if (posts.addPhotoPost(post)) {
        localStorage.photoPosts = JSON.stringify(posts);
    }
    let feed = document.getElementsByClassName("feed")[0];
    feed.innerHTML = ``;

    localStorage.state = "2";
    dom.displayPosts(posts.getPhotoPosts());

    let actuall_amount = document.getElementsByClassName("post").length;
    if (actuall_amount < posts.length)
        document.getElementsByClassName("btn-load-more")[0].style.display = "block";
    else return false;
}
function removePhotoPost(id) {
    const posts = JSON.parse(localStorage.photoPosts);
    if (posts.removePhotoPost(id)) {
        localStorage.photoPosts = JSON.stringify(posts);
        if (dom.removePhotoPost(id)) {

            let actuall_amount = document.getElementsByClassName("post").length;
            if (actuall_amount < posts.getPhotoPosts(0, posts.length, filterConfig).length)
                dom.displayPosts([posts.getPhotoPosts(actuall_amount, 1, filterConfig)[0]]);
            if (posts.length <= actuall_amount + 1)
                document.getElementsByClassName("btn-load-more")[0].style.display = "none";
        }
        return true;
    }
    return false;

}
function editPhotoPost(id, newPost) {
    const posts = JSON.parse(localStorage.photoPosts);
    if (posts.editPhotoPost(id, newPost)) {
        localStorage.photoPosts = JSON.stringify(posts);
        dom.editPhotoPost(id, posts.getPhotoPost(id));
        return true;
    }
    else
        return false;
}
function pressLoadMoreButton() {
    const posts = JSON.parse(localStorage.photoPosts);
    let actuall_amount = document.getElementsByClassName("post").length;
    if (actuall_amount < posts.getPhotoPosts(0, posts.length, filterConfig).length) {
        if (posts.getPhotoPosts(0, photoPosts.length, filterConfig).length - actuall_amount <= 10)
            document.getElementsByClassName("btn-load-more")[0].style.display = "none";
        dom.displayPosts(posts.getPhotoPosts(actuall_amount, undefined, filterConfig));
    }
    else
        document.getElementsByClassName("btn-load-more")[0].style.display = "none";
}

function pressLike(id) {
    const posts = JSON.parse(localStorage.photoPosts);
    const post = posts.getPhotoPost(id);

    const ind = post.likes.findIndex((el) => el === localStorage.user);
    if (~ind) {
        post.likes.splice(ind, 1);
    }
    else {
        post.likes.push(localStorage.user);
    }
    localStorage.photoPosts = JSON.stringify(posts);
}

function checkUser() {
    const form = document.forms.logInForm;
    const name = form[0].value;
    const password = form[1].value;
    let error = document.getElementsByClassName("error")[0];

    const users = JSON.parse(localStorage.users);
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === name) {
            if (users[i].password === password) {
                if (error) {
                    error.remove();
                }
                localStorage.user = name;
                DisplayFeed();
                displayPosts();
                dom.displayUserInfo(localStorage.user);
                return true;
            }
            else {
                if (!error) {
                    let error = document.createElement("div");
                    error.classList.add("error");
                    error.innerHTML = `wrong password`;
                    form.insertBefore(error, form[2]);
                }
                else {
                    error.innerHTML = `wrong password`;
                }
                return false;
            }
        }
    }
    if (!error) {
        let error = document.createElement("div");
        error.classList.add("error");
        error.innerHTML = `wrong all`;
        form.insertBefore(error, form[2]);
    }
    else {
        error.innerHTML = `wrong all`;
    }
    return false;
}

function pressAddPost() {
    let hashTags = document.querySelector(`textarea[class="hashtags"]`).value.split(" ");
    let description = document.querySelector(`textarea[class="description"]`).value || "";
    let photoLink = "pic/" + document.getElementsByClassName("DragDropInput")[0].files[0].name;
    document.getElementsByClassName("main")[0].style.margin = "0";
    DisplayFeed();
    let data = new Date();

    addPhotoPost(new Post(localStorage.user, data, photoLink, [], description, hashTags));
}
function saveEditPost(post) {
    const hashTags = post.querySelector(`textarea[class="hashtags"]`).value.split(" ");
    const description = post.querySelector(`textarea[class="description"]`).value || "";
    const input = post.getElementsByClassName("DragDropInput")[0];
    let photoLink;
    if (input.files[0]) {
        photoLink = "pic/" + input.files[0].name;
    }
    else {
        photoLink = post.getElementsByClassName("background")[0].src;
    }

    editPhotoPost(post.id, { hashTags, description, photoLink });
}



function setFilterFromDate(el) {
    const data = el.value.split(".");
    filterConfig.fromDate = new Date(data[2], data[1] - 1, data[0]), 0, 0;
    displayPosts();
}
function setFilterToDate(el) {
    const data = el.value.split(".");
    filterConfig.toDate = new Date(data[2], data[1] - 1, data[0], 24, 0);
    displayPosts();
}
function setFilterAuthor(el) {
    filterConfig.author = el.value;
    displayPosts();
}
function setFilterHashtags(el) {
    if (el.value === "") {
        filterConfig.hashTags = []
    }
    else {
        filterConfig.hashTags = el.value.split(" ");
    }
    displayPosts();
}



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