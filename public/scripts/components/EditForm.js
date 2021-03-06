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
        <i class="save-icon material-icons" onclick="saveEditPost(this.parentNode.parentNode)">save</i>
        <div class="post-username edit-username">
            ${localStorage.user}
        </div>
    </div>
    <div class="DragAndDrop">
        <div class ="DragDropText">Drag here or <i>click</i></div>
        <input class="DragDropInput" type="file" accept="image/*" onchange="dom.displayPhoto(this.parentNode)" > 
        <img class="background" src="${postToEdit.photoLink}">
    </div>
    <div class="post-info">
        <textarea placeholder="description"  class="description">${postToEdit.description}</textarea>

        <textarea placeholder="#hashtags"  class="hashtags">${postToEdit.hashTags.join("\n")}</textarea>
    </div>
    `;
    post.getElementsByClassName("DragAndDrop")[0].style.height = "auto";
    post.style.margin = "0 0 50px 0"
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
