const DisplayAddForm = () => {
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
}