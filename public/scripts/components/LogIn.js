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