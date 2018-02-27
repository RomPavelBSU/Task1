(function () {

    var filterConfig = {
        username: 'RomPavel',
        hashTags: ["#Photo4Photo", "#dinero", "#JSbetterThanVerstka"],
        fromDate: new Date(2010, 10, 19),
        toDate: new Date(2012, 12, 17)
    }

    var photoPosts = [
        {
            id: '1',
            description: 'Hello',
            createdAt: new Date(2012, 10, 19, 23, 12),
            author: 'RomPavel',
            photoLink: 'photogram1',
            hashTags: ['#Photo4Photo', '#dinero', "#JSbetterThanVerstka", "#photogram"],
            likes: ['exadel', 'epam', 'HTP']
        },
        {
            id: '2',
            description: 'Goobye',
            createdAt: new Date(2013, 10, 19, 23, 12),
            author: 'epam',
            photoLink: 'logo',
            hashTags: ['#Photo4Photo', '#dinero'],
            likes: ['exadel', 'HTP']
        },
        {
            id: '3',
            description: 'Hello, how are u?',
            createdAt: new Date(2011, 10, 19, 23, 12),
            author: 'exadel',
            photoLink: 'logo',
            hashTags: ['#dinero'],
            likes: ['RomPavel']
        },
        {
            id: '4',
            description: 'Hello',
            createdAt: new Date(2012, 12, 31, 23, 12),
            author: 'RomPavel',
            photoLink: 'photogram2',
            hashTags: ['#Photo4Photo'],
            likes: ['exadel', 'epam', 'HTP']
        },
        {
            id: '5',
            description: 'You read all of descriotions?',
            createdAt: new Date(2012, 10, 19, 23, 12),
            author: 'junior',
            photoLink: 'summer',
            hashTags: ['#dinero', '#cash'],
            likes: ['exadel', 'epam', 'HTP']
        },
        {
            id: '6',
            description: 'Really?',
            createdAt: new Date(2005, 10, 19, 23, 12),
            author: 'RomPavel',
            photoLink: 'photogram',
            hashTags: ['#Photo4Photo',],
            likes: ['exadel', 'epam', 'HTP']
        },
        {
            id: '7',
            description: 'my respect',
            createdAt: new Date(2002, 10, 19, 23, 12),
            author: 'exadel',
            photoLink: 'photogram',
            hashTags: ['#Photo4Photo', '#dinero'],
            likes: ['exadel', 'epam', 'HTP']
        },
        {
            id: '8',
            description: 'But it seems to me that this is not the right time management',
            createdAt: new Date(2011, 11, 19, 23, 12),
            author: 'RomPavel',
            photoLink: 'photogram',
            hashTags: ['#Photo4Photo', '#dinero', '#JSbetterThanVerstka'],
            likes: ['exadel', 'epam']
        },
        {
            id: 9,
            description: 'not valid post',
            createdAt: "25 december",
            author: 5,
            photoLink: 'photogram',
            hashTags: ['#Photo4Photo', '#dinero', '#ECMAbetterThanVerstka'],
            likes: ['exadel', 'epam']

        },
        {
            id: '10',
            description: 'valid post',
            createdAt: new Date(2012, 11, 18, 23, 12),
            author: 'BSU',
            photoLink: 'photogram',
            hashTags: ['#Photo4Photo', '#ECMAbetterThanVerstka'],
            likes: ['exadel', 'epam']

        }
    ]

    photoPosts.__proto__ = {
        getPhotoPosts: function (skip, top, filterConfig) {
            if (arguments.length == 0) {
                skip = 0;
                top = 10;
            }
            else if (arguments.length === 1) {
                if (typeof skip !== "number") {
                    console.log("Invalid argument in getPhotoPosts");
                    return;
                }
                top = 10;
            }
            else if (arguments.length === 2) {
                if (typeof skip !== "number" || typeof top !== "number") {
                    console.log("Invalid argument in getPhotoPosts");
                    return;
                }
            }

            var sortedPhotoPosts = [].sort.call(this, (post1, post2) => {
                return post1.createdAt - post2.createdAt;
            });

            if (filterConfig !== undefined && typeof filterConfig === "object") {
                sortedPhotoPosts = [].filter.call(sortedPhotoPosts, (post) => {
                    if (filterConfig.hasOwnProperty("username")) {
                        if (filterConfig.username !== post.author)
                            return false;
                    }
                    if (filterConfig.hasOwnProperty("hashTags")) {
                        if (!filterConfig.hashTags.every((tag) => {
                            return post.hashTags.includes(tag);
                        }))
                            return false;
                    }
                    if (filterConfig.hasOwnProperty("fromDate")) {
                        if (post.createdAt - filterConfig.fromDate < 0)
                            return false;
                    }
                    if (filterConfig.hasOwnProperty("toDate")) {
                        if (filterConfig.toDate - post.createdAt < 0)
                            return false;
                    }

                    return true;
                });
            }
            return [].slice.call(sortedPhotoPosts, skip, top + skip);
        },

        getPhotoPost: function (id) {
            if (typeof id !== "string") {
                console.log("Invalid argument in getPhotoPost");
                return;
            }
            for (var i = 0; i < this.length; i++) {
                if (this[i].id === id) return this[i];
            }
            return "There is no element with id:" + id;
        },

        validatePhotoPost: function (post) {
            if (typeof post !== "object") {
                console.log("Invalid argument in validatePhotoPost");
                return;
            }
            if (typeof post.id !== "string" || post.id === "")
                return false;
            if (typeof post.description !== "string" || post.description === "")
                return false;
            if (!(post.createdAt instanceof Date))
                return false;
            if (typeof post.author !== "string" || post.author === "")
                return false;
            if (typeof post.photoLink !== "string" || post.photoLink === "")
                return false;
            if (typeof post.hashTags === null)
                return false;
            if (typeof post.likes === null)
                return false;

            return true;
        },

        addPhotoPost: function (post) {
            if (!this.validatePhotoPost(post)) return false;

            [].push.call(this, post);
            return true;
        },

        editPhotoPost: function (id, post) {
            if (typeof id !== "string" || id === "") {
                console.log("Invalid argument in editPhotoPost");
                return false;
            }
            if (typeof post !== "object" || post.hasOwnProperty("author") || post.hasOwnProperty("id") || post.hasOwnProperty("createdAt")) {
                console.log("Invalid argument \"post\" in editPhotoPost");
                return false;
            }


            var pos;
            for (var i = 0; i < this.length; i++) {
                if (this[i].id == id) {
                    pos = i;
                    break;
                }
            }
            if (pos === undefined) {
                console.log("There is no element with id:" + id);
                return false;
            }
            if (!this.validatePhotoPost(this[pos])) {
                return false;
            }
            for (property in post) {
                this[pos][property] = post[property];
            }

            return true;
        },
        removePhotoPost: function (id) {
            if (typeof id !== "string" || id === "") {
                console.log("Invalid argument in removePhotoPost");
                return false;
            }
            for (var i = 0; i < this.length; i++) {
                if (this[i].id === id) {
                    [].splice.call(this, i, 1);
                    return true;
                }
            }
            console.log("There is no element with id:" + id);
            return false;
        }
    }

    //tests
    console.log("-getPhotoPosts")
    console.log("10 posts:");
    console.log(photoPosts.getPhotoPosts());
    console.log("3 posts start from the second:");
    console.log(photoPosts.getPhotoPosts(1, 3));
    console.log("posts after filtering:");
    console.log(photoPosts.getPhotoPosts(0, 10, filterConfig));

    console.log("with invalid argument:")
    console.log(photoPosts.getPhotoPosts("argument"));

    console.log("");
    console.log("-getPhotoPost");
    console.log("post with id 2:");
    console.log(photoPosts.getPhotoPost('2'));
    console.log("post with id 9:");
    console.log(photoPosts.getPhotoPost('9'));
    console.log("with invalid argument:");
    console.log(photoPosts.getPhotoPost(100));

    console.log("");
    console.log("-validatePhotoPost");
    console.log("with valid, necessary and not properties:");
    console.log(photoPosts.validatePhotoPost({
        id: "4",
        description: 'Hello',
        createdAt: new Date(2012, 10, 19, 23, 12),
        author: 'RomPavel',
        photoLink: 'photogram1',
        hashTags: ['#Photo4Photo', '#dinero'],
        likes: ['exadel', 'epam', 'HTP']
    }));
    console.log("with invalid createdAt:");
    console.log(photoPosts.validatePhotoPost({
        id: "4",
        description: 'Hello',
        createdAt: 4,
        author: 'RomPavel',
        photoLink: 'photogram1',
        hashTags: ['#Photo4Photo', '#dinero'],
        likes: ['exadel', 'epam', 'HTP']
    }));
    console.log("only with nessesery properties:");
    console.log(photoPosts.validatePhotoPost({
        id: "4",
        description: 'Hello',
        createdAt: new Date(2012, 10, 19, 23, 12),
        author: 'RomPavel',
        photoLink: 'photogram1',
    }));

    console.log("");
    console.log("-addPhotoPost");
    console.log("all posts: ");
    console.log(photoPosts);
    console.log("try to add invalid post: ");
    console.log(photoPosts.addPhotoPost({
        id: "4",
        description: 'Hello',
        createdAt: 4
    }));
    console.log("all posts: ");
    console.log(photoPosts);
    console.log("try to add valid post: ");
    console.log(photoPosts.addPhotoPost({
        id: "10",
        description: 'Hello',
        createdAt: new Date(2012, 10, 19, 23, 12),
        author: 'RomPavel',
        photoLink: 'photogram1',
        hashTags: ['#Photo4Photo', '#dinero'],
        likes: ['exadel', 'epam', 'HTP']
    }));
    console.log("all posts: ");
    console.log(photoPosts);

    console.log("");
    console.log("-editPhotoPost");
    console.log("id=3 post before editing:");
    console.log(photoPosts.getPhotoPost('3'));
    console.log("try to edit id=3 post:");
    console.log(photoPosts.editPhotoPost('3', {
        photoLink: 'new.link',
        description: 'new description'
    }));
    console.log("id=3 post after editing:");
    console.log(photoPosts.getPhotoPost('3'));
    console.log("with invalid argument:");
    console.log(photoPosts.editPhotoPost(''));

    console.log("");
    console.log("-removePhotoPost");
    console.log("with invalid argument:");
    console.log(photoPosts.removePhotoPost(''));
    console.log("remove id=3 post");
    console.log(photoPosts.removePhotoPost('3'));
    console.log("try to get id=3 post");
    console.log(photoPosts.getPhotoPost('3'));
})();

