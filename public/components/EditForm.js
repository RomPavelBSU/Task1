const DisplayEditForm = (post) => {
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