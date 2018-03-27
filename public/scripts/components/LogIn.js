const DisplayLogIn = () => {
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
}