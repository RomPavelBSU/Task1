
//module
const dom = (function () {

    const user = "StefanoGrande";

    document.getElementsByClassName("user-info")[0].childNodes[2].textContent = user || "WhoAreYou?";

    if (!user) {
        let button = document.createElement("button")
        button.classList.add("btn");
        button.classList.add("btn-sign-in");
        button.innerText = "sign in";

        document.querySelector(".btn-new-post").remove();
        document.querySelector(".btn-sign-out").replaceWith(button);
    }

    return {
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

        createHTMLforPost(post) {
            let data = post.createdAt;
            return `
            <div class="post-toolbar">
                <div class="post-upload-data">
                    ${data.getHours()}:${data.getMinutes()} / ${data.getDate()}.${data.getMonth() + 1}.${data.getFullYear()}
                </div>
                ${ user ?
                    `<i class="like-icon material-icons">${post.likes.includes(user) ? `favorite` : `favorite_border`}</i>`
                    : ``}

                <div  class="post-toolbar-user">
                ${
                post.author === user ?
                    `
                <i class="edit-icon material-icons">mode_edit</i>
                <div class="post-username">
                    ${post.author}
                </div>
                <i class="delete-icon material-icons">delete</i>
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
        }
    }
})();


//Global Functions
function displayPosts() {

    let feed = document.getElementsByClassName("feed")[0];
    while (feed.lastChild)
        feed.lastChild.remove();

    dom.displayPosts(photoPosts.getPhotoPosts(undefined, undefined, filterConfig));
}

function addPhotoPost(post) {
    if (photoPosts.addPhotoPost(post)) {
        let feed = document.getElementsByClassName("feed")[0];

        while (feed.lastChild)
            feed.lastChild.remove();

        dom.displayPosts(photoPosts.getPhotoPosts());

        let actuall_amount = document.getElementsByClassName("post").length;
        if (actuall_amount < photoPosts.length)
            document.getElementsByClassName("btn-load-more")[0].style.display = "block";

        return true;
    }
    else return false;
}
function removePhotoPost(id) {
    if (photoPosts.removePhotoPost(id)) {
        if (dom.removePhotoPost(id)) {

            let actuall_amount = document.getElementsByClassName("post").length;
            if (actuall_amount < photoPosts.getPhotoPosts(0, photoPosts.length, filterConfig).length)
                dom.loadOneMorePost(photoPosts.getPhotoPosts(actuall_amount, 1, filterConfig)[0]);
            if (photoPosts.length <= actuall_amount + 1)
                document.getElementsByClassName("btn-load-more")[0].style.display = "none";
        }
        return true;
    }
    return false;

}
function editPhotoPost(id, newPost) {
    if (photoPosts.editPhotoPost(id, newPost)) {
        dom.editPhotoPost(id, photoPosts.getPhotoPost(id));
        return true;
    }
    else
        return false;
}
function pressLoadMoreButton() {
    let actuall_amount = document.getElementsByClassName("post").length;
    if (actuall_amount < photoPosts.getPhotoPosts(0, photoPosts.length, filterConfig).length) {
        if (photoPosts.getPhotoPosts(0, photoPosts.length, filterConfig).length - actuall_amount <= 10)
            document.getElementsByClassName("btn-load-more")[0].style.display = "none";
        dom.displayPosts(photoPosts.getPhotoPosts(actuall_amount, undefined, filterConfig));
    }
    else
        document.getElementsByClassName("btn-load-more")[0].style.display = "none";
}


displayPosts();
// addPhotoPost({
//     id: '1',
//     description: 'Where my prince on a white horse?',
//     createdAt: new Date(1800, 14, 18, 23, 12),
//     author: 'AnnaMaria',
//     photoLink: 'pic/barokko1.jpg',
//     hashTags: ['#InCastle', '#WaitingForPrince'],
//     likes: ['AnnaMaria', 'MarioValentino',]
// })
// addPhotoPost({
//     id: '2',
//     description: 'How to get rid of rats in the house?',
//     createdAt: new Date(1820, 11, 18, 23, 12),
//     author: 'AnnaMaria',
//     photoLink: 'pic/barokko2.jpg',
//     hashTags: ['#InCastle', '#HateRats'],
//     likes: ['StefanoGrande']
// })
// addPhotoPost({
//     id: '3',
//     description: 'War.... war never changes',
//     createdAt: new Date(1810, 10, 16, 20, 12),
//     author: 'StefanoGrande',
//     photoLink: 'pic/barokko.jpg',
//     hashTags: ['#InCastle', '#HateWar'],
//     likes: ['AnnaMaria', 'MarioValentino',]
// })
// addPhotoPost({
//     id: '4',
//     description: 'Again I lost the crop',
//     createdAt: new Date(1850, 10, 16, 20, 12),
//     author: 'MarioValentino',
//     photoLink: 'pic/barokko4.jpg',
//     hashTags: ['#NotInCastle', '#NeedJob', '#GodBlessKing'],
//     likes: ['AnnaMaria']
// })
// addPhotoPost({
//     id: '5',
//     description: 'War.... war never changes',
//     createdAt: new Date(1810, 10, 16, 20, 12),
//     author: 'AnnaMaria',
//     photoLink: 'pic/barokko3.jpg',
//     hashTags: ['#InCastle', '#HateWar'],
//     likes: ['AnnaMaria']
// })
// addPhotoPost({
//     id: '6',
//     description: 'War.... war never changes',
//     createdAt: new Date(1910, 10, 16, 20, 12),
//     author: 'StefanoGrande',
//     photoLink: 'pic/exadel.jpg',
//     hashTags: ['#InCastle', '#HateWar'],
//     likes: ['AnnaMaria']
// })
// addPhotoPost({
//     id: '7',
//     description: 'War.... war never changes',
//     createdAt: new Date(1930, 10, 16, 20, 12),
//     author: 'MarioValentino',
//     photoLink: 'pic/exadel1.jpg',
//     hashTags: ['#InCastle', '#HateWar'],
//     likes: ['AnnaMaria']
// })
// addPhotoPost({
//     id: '8',
//     description: 'War.... war never changes',
//     createdAt: new Date(1900, 10, 16, 20, 12),
//     author: 'StefanoGrande',
//     photoLink: 'pic/exadel2.jpg',
//     hashTags: ['#InCastle', '#HateWar'],
//     likes: ['AnnaMaria', 'StefanoGrande']
// })
// addPhotoPost({
//     id: '9',
//     description: 'War.... war never changes',
//     createdAt: new Date(1950, 10, 16, 20, 12),
//     author: 'AnnaMaria',
//     photoLink: 'pic/exadel.jpg',
//     hashTags: ['#InCastle', '#HateWar'],
//     likes: ['AnnaMaria', 'StefanoGrande']
// })
// addPhotoPost({
//     id: '10',
//     description: 'War.... war never changes',
//     createdAt: new Date(1990, 10, 16, 20, 12),
//     author: 'StefanoGrande',
//     photoLink: 'pic/order.jpg',
//     hashTags: ['#InCastle', '#HateWar'],
//     likes: ['AnnaMaria']
// })
// addPhotoPost({
//     id: '11',
//     description: 'War.... war never changes',
//     createdAt: new Date(2000, 10, 16, 20, 12),
//     author: 'AnnaMaria',
//     photoLink: 'pic/exadel2.jpg',
//     hashTags: ['#InCastle', '#HateWar'],
//     likes: ['AnnaMaria']
// })

// editPhotoPost("11", { description: "new description" });
// displayPosts();
