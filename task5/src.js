
//module
const dom = (function () {
    return {
        displayUserInfo(user) {
            document.getElementsByClassName("user-info")[0].childNodes[2].textContent = user || "WhoAreYou?";
            if (!user) {
                let button = document.createElement("button")
                button.classList.add("btn");
                button.classList.add("btn-sign-in");
                button.innerText = "sign in";

                document.querySelector(".btn-new-post").remove();
                document.querySelector(".btn-sign-out").replaceWith(button);
            }
        },
        displayPosts(posts) {

            let feed = document.getElementsByClassName("feed")[0];
            let element;
            for (post of posts) {
                element = document.createElement("div");
                element.id = post.id;
                element.classList.add("post");
                element.innerHTML = this.createHTMLforPost(post);
                feed.appendChild(element);
            }

        },
        loadOneMorePost(post) {
            let feed = document.getElementsByClassName("feed")[0];
            element = document.createElement("div");
            element.id = post.id;
            element.classList.add("post");
            element.innerHTML = this.createHTMLforPost(post);
            feed.appendChild(element);
        },
        removePhotoPost(id) {
            let post = document.getElementById(id);
            if (post) {
                post.remove();
                return true;
            }
            return false;
        },

        editPhotoPost(id, post) {
            let postToEdit = document.getElementById(id);
            if (postToEdit) {
                let element = document.createElement("div");
                element.classList.add("post");
                element.id = id;
                element.innerHTML = this.createHTMLforPost(post);
                postToEdit.replaceWith(element);
            }

        },
        pressLike(button) {
            button.innerHTML = button.innerHTML === "favorite" ? "favorite_border" : "favorite";
        },
        createHTMLforPost(post) {
            let data = new Date(post.createdAt);
            return `
            <div class="post-toolbar">
                <div class="post-upload-data">
                    ${data.getHours()}:${data.getMinutes()} / ${data.getDate()}.${data.getMonth() + 1}.${data.getFullYear()}
                </div>
                ${ localStorage.user ?
                    `<i class="like-icon material-icons" onclick="pressLike(this.parentNode.parentNode.id);dom.pressLike(this)">${post.likes.includes(localStorage.user) ? `favorite` : `favorite_border`}</i>`
                    :
                    ``
                }

                <div  class="post-toolbar-user">
                ${
                post.author === localStorage.user ?
                    `
                    <i class="edit-icon material-icons" onclick="dom.displayEditForm(this.parentNode.parentNode.parentNode)">mode_edit</i>
                    <div class="post-username">
                        ${post.author}
                    </div>
                    <i class="delete-icon material-icons" onclick="removePhotoPost(this.parentNode.parentNode.parentNode.id)">delete</i>
                `
                    :
                    `
                    <div class="post-username">
                       ${post.author}
                    </div>
                `
                }
                </div >
            </div >
            <img src=${post.photoLink} width="380" alt="photo">
            <div class="post-info">
                <div class="description">
                    ${post.description}
                </div>
                <div class="hashtags">
                    ${post.hashTags.join("\n")}
                </div>
            </div>
            `
        },

        displayFeed() {
            localStorage.state = "2";
            let logIN = document.getElementsByClassName("logIN")[0];
            let addPhotoForm = document.getElementsByClassName("addPhotoForm")[0];
            if (logIN)
                logIN.remove();
            if (addPhotoForm)
                addPhotoForm.remove();

            let filters = document.createElement("div");
            filters.classList.add("filters-container");
            filters.innerHTML = `
                <div class="filt-cont-text">
                    Filters
                </div>
    
                <input type="text" class="filter" oninput="setFilterAuthor(this)" placeholder="username">
    
                <input type="text" class="filter" oninput="setFilterHashtags(this)" placeholder="#hashtags">
    
                <div class="filters-by-date">
                    from:
                    <input type="text" class="filter filt-by-date" oninput="setFilterFromDate(this)" placeholder="dd.mm.yyyy"> to:
                    <input type="text" class="filter filt-by-date" oninput="setFilterToDate(this)" placeholder="dd.mm.yyyy">
                 </div>
            `;
            let body = document.getElementsByTagName("body")[0];
            body.insertBefore(filters, body.childNodes[1]);
            let btn = document.createElement("button");
            btn.classList.add("btn");
            btn.classList.add("btn-new-post");
            btn.innerHTML = `
                new post
            `;
            btn.addEventListener("click", dom.displayAddPage);
            let header = document.getElementsByClassName("header")[0];
            header.insertBefore(btn, header.childNodes[3]);

            btn = document.getElementsByClassName("btn-sign-out")[0];
            if (!btn) {
                btn = document.createElement("button");
                btn.classList.add("btn");
                btn.classList.add("btn-sign-out");
                btn.innerHTML = `
                sign out
            `
                btn.addEventListener("click", dom.displayLogIn);
                header.insertBefore(btn, header.childNodes[4]);
            }

            btn = document.createElement("button");
            btn.classList.add("btn");
            btn.classList.add("btn-load-more");
            btn.innerHTML = `
                load more
            `
            btn.addEventListener("click", pressLoadMoreButton);

            let main = document.getElementsByClassName("main")[0];
            main.insertBefore(btn, main.childNodes[1]);
            let feed = document.createElement("div");
            feed.classList.add("feed");
            main.insertBefore(feed, main.childNodes[1]);
        },
        displayLogIn() {
            localStorage.state = "1";
            let feed = document.getElementsByClassName("feed")[0];
            let filters = document.getElementsByClassName("filters-container")[0];
            let btns = document.getElementsByClassName("btn");
            let addPhotoForm = document.getElementsByClassName("addPhotoForm")[0];

            if (addPhotoForm)
                addPhotoForm.remove();
            if (feed)
                feed.remove();
            if (filters)
                filters.remove();
            while (btns.length > 0) {
                btns[0].remove();
            }
            let main = document.getElementsByClassName("main")[0];
            let logIN = document.createElement("div");
            logIN.classList.add("logIN");
            logIN.innerHTML =
                `
            <div class="welcomeText">Welcome to Photogram!</div>
            <form name="logInForm"" onsubmit="return false;">
                <input placeholder="1 || AnnaMaria" class="username"/>
                <input type="password" placeholder="1 || 222" class="password"/>
                <button type="button" class="btn btn-log-in" onclick="checkUser()">log in</button>
            </form>
            
            `;
            main.insertBefore(logIN, main.childNodes[1]);
        },

        displayAddPage() {
            localStorage.state = "3";
            let main = document.getElementsByClassName("main")[0];
            let feed = document.getElementsByClassName("feed")[0];
            let filters = document.getElementsByClassName("filters-container")[0];
            let logIN = document.getElementsByClassName("logIN")[0];
            let btn = document.getElementsByClassName("btn-load-more")[0];
            let newPost = document.getElementsByClassName("btn-new-post")[0];

            if (logIN)
                logIN.remove();
            if (feed)
                feed.remove();
            if (filters)
                filters.remove();
            if (btn)
                btn.remove();
            if (newPost)
                newPost.remove();

            let addPhoto = document.createElement("div");
            addPhoto.classList.add("addPhoto");
            addPhoto.innerHTML = `
            <div class="post-toolbar">
                <div class="post-username">
                    ${localStorage.user}
                </div>
            </div>
            <div class="DragAndDrop">
                <div class ="DragDropText">Drag here or <i>click</i></div>
                <input class="DragDropInput" type="file" accept="image/*" onchange="dom.displayPhoto(this)" > 
                <img class="background">
            </div>
            <div class="post-info">
                <textarea placeholder="description" class="description"></textarea>

                <textarea placeholder="#hashtags" class="hashtags"></textarea>
            </div>
            `
            btn = document.createElement("button");
            btn.classList.add("btn");
            btn.classList.add("btn-add-photo");
            btn.innerHTML = `add photo`;
            btn.addEventListener("click", pressAddPost);

            let form = document.createElement("form");
            form.classList.add("addPhotoForm");
            form.appendChild(addPhoto);
            form.appendChild(btn);

            main.insertBefore(form, main.childNodes[1]);
            document.getElementsByClassName("main")[0].style.margin = "70px 0 0 0";
        },
        displayPhoto(elem) {

            document.getElementsByClassName("DragAndDrop")[0].style.height = "auto";
            const background = document.getElementsByClassName("background")[0];
            background.src = `pic/${elem.files[0].name}`

            const text = document.querySelector(".DragDropText");
            text.style.color = "#00a5d383";
        },
        displayEditForm(post) {
            const postToEdit = JSON.parse(localStorage.photoPosts).getPhotoPost(post.id);
            const data = new Date(postToEdit.createdAt);
            post.innerHTML = ``;
            post.classList.add("addPhotoForm");
            post.style.height = "auto";
            post.innerHTML = `
            <div class="post-toolbar">
                <div class="post-upload-data">
                    ${data.getHours()}:${data.getMinutes()} / ${data.getDate()}.${data.getMonth() + 1}.${data.getFullYear()}
                </div>
                <i class="like-icon material-icons" onclick="saveEditPost(this.parentNode.parentNode)">save</i>
                <div class="post-username">
                    ${localStorage.user}
                </div>
            </div>
            <div class="DragAndDrop">
                <div class ="DragDropText">Drag here or <i>click</i></div>
                <input class="DragDropInput" type="file" accept="image/*" onchange="dom.displayPhoto(this)" > 
                <img class="background" src="${postToEdit.photoLink}">
            </div>
            <div class="post-info">
                <textarea placeholder="description"  class="description">${postToEdit.description}</textarea>
        
                <textarea placeholder="#hashtags"  class="hashtags">${postToEdit.hashTags}</textarea>
            </div>
            `;
            post.getElementsByClassName("DragAndDrop")[0].style.height = "auto";
            post.style.margin = "0 0 50px 0"
        }
    }
})();

function displayPosts() {
    const posts = JSON.parse(localStorage.photoPosts);
    let feed = document.getElementsByClassName("feed")[0];
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

    localStorage.state="2";
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
                dom.loadOneMorePost(posts.getPhotoPosts(actuall_amount, 1, filterConfig)[0]);
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
                dom.displayFeed();
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
    dom.displayFeed();
    let data = new Date();

    addPhotoPost(new Post(localStorage.user, data , photoLink, [], description, hashTags));
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
            dom.displayLogIn();
            break;
        }
        case "2": {
            dom.displayFeed();
            displayPosts();
            dom.displayUserInfo(localStorage.user);
            break;
        }
        case "3": {
            dom.displayAddPage();
            break;
        }
    }
}

display();