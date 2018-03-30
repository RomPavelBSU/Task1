const DisplayFeed = () => {
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
    
                <input type="text" class="filter" oninput="filterChange('author', this)" placeholder="username">
    
                <input type="text" class="filter" oninput="filterChange('hashTags', this)" placeholder="#hashtags">
    
                <div class="filters-by-date">
                    from:
                    <input type="text" class="filter filt-by-date" oninput="filterChange('fromDate', this)" placeholder="dd.mm.yyyy"> to:
                    <input type="text" class="filter filt-by-date" oninput="filterChange('toDate', this)" placeholder="dd.mm.yyyy">
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
    btn.addEventListener("click", DisplayAddForm);
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
        btn.addEventListener("click", DisplayLogIn);
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
}








function displayPosts() {
    const posts = JSON.parse(localStorage.photoPosts);
    const feed = document.getElementsByClassName("feed")[0];

    feed.innerHTML = ``;

    dom.displayPosts(posts.getPhotoPosts(undefined, undefined, filterConfig));
    const actuall_amount = document.getElementsByClassName("post").length;

    if (posts.getPhotoPosts(0, posts.length, filterConfig).length - actuall_amount === 0) {
        document.getElementsByClassName("btn-load-more")[0].style.display = "none";
    }
    else {
        document.getElementsByClassName("btn-load-more")[0].style.display = "block";
    }
}

function addPhotoPost(post) {
    const posts = JSON.parse(localStorage.photoPosts);
    if (posts.addPhotoPost(post)) {
        localStorage.photoPosts = JSON.stringify(posts);
    }
    const feed = document.getElementsByClassName("feed")[0];
    feed.innerHTML = ``;

    localStorage.state = "2";
    dom.displayPosts(posts.getPhotoPosts());

    const actuall_amount = document.getElementsByClassName("post").length;
    if (actuall_amount < posts.length)
        document.getElementsByClassName("btn-load-more")[0].style.display = "block";
    else return false;
}
function removePhotoPost(id) {
    const posts = JSON.parse(localStorage.photoPosts);
    if (posts.removePhotoPost(id)) {
        localStorage.photoPosts = JSON.stringify(posts);
        if (dom.removePhotoPost(id)) {

            const actuall_amount = document.getElementsByClassName("post").length;
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
    const actuall_amount = document.getElementsByClassName("post").length;
    if (actuall_amount < posts.getPhotoPosts(0, posts.length, filterConfig).length) {
        if (posts.getPhotoPosts(0, posts.length, filterConfig).length - actuall_amount <= 10)
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

function filterChange(option, el){
    let data;

    switch(option){
        case "fromDate":{
            data = el.value.split(".");
            filterConfig.fromDate = new Date(data[2], data[1] - 1, data[0], 0, 0);
            break;
        }
        
        case "toDate":{
            data = el.value.split(".");
            filterConfig.toDate = new Date(data[2], data[1] - 1, data[0], 24, 0);
            break;
        }

        case "author":{
            filterConfig.author = el.value;
            break;
        }

        case "hashTags":{
            if (el.value === "") {
                filterConfig.hashTags = []
            }
            else {
                filterConfig.hashTags = el.value.split(" ");
            }
            break;
        }
    }

    displayPosts();
}