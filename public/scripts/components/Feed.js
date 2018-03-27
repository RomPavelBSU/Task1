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