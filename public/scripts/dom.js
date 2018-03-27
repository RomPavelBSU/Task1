const dom = (function () {
    return {

        displayUserInfo() {

            const user = localStorage.user;

            document.getElementsByClassName("user-info")[0].childNodes[2].textContent = user || "WhoAreYou?";

            if (!user) {
                const button = document.createElement("button")
                button.classList.add("btn");
                button.classList.add("btn-sign-in");
                button.innerText = "sign in";

                document.querySelector(".btn-new-post").remove();
                document.querySelector(".btn-sign-out").replaceWith(button);
            }
        },

        displayPosts(posts) {

            const feed = document.getElementsByClassName("feed")[0];
            let element;
            
            for (post of posts) {
                element = this.createHTMLforPost(post);
                feed.appendChild(element);
            }

        },

        removePhotoPost(id) {

            const post = document.getElementById(id);

            if (post) {
                post.remove();
                return true;
            }

            return false;
        },

        editPhotoPost(id, post) {

            const postToEdit = document.getElementById(id);

            if (postToEdit) {
                const element = this.createHTMLforPost(post);
                postToEdit.replaceWith(element);
            }

        },

        pressLike(button) {
            button.innerHTML = button.innerHTML === "favorite" ? "favorite_border" : "favorite";
        },

        createHTMLforPost(post) {
            const data = new Date(post.createdAt);
            const user = localStorage.user;

            const element = document.createElement('div');
            element.classList.add("post");
            element.id = post.id;
            element.innerHTML = 
            `
                <div class="post-toolbar">
                    <div class="post-upload-data">
                        ${data.getHours()}:${data.getMinutes()} / ${data.getDate()}.${data.getMonth() + 1}.${data.getFullYear()}
                    </div>
                    ${ user && `<i class="like-icon material-icons" onclick="pressLike(this.parentNode.parentNode.id);dom.pressLike(this)">${post.likes.includes(user) ? `favorite` : `favorite_border`}</i>`}

                    <div  class="post-toolbar-user">
                    ${
                    post.author === user ?
                        `
                        <i class="edit-icon material-icons" onclick="DisplayEditForm(this.parentNode.parentNode.parentNode)">mode_edit</i>
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
            return element;
        },

        displayPhoto(form) {

            form.style.height = "auto";
            form.getElementsByClassName("background")[0].src = URL.createObjectURL(form.getElementsByTagName("input")[0].files[0]);
            form.querySelector(".DragDropText").style.color = "#00a5d383";

        }

    }
})();
