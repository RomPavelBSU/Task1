const ServerModule = (function () {
    return {

        getPhotoPosts(skip = 0, top = 10, filterConfig) {

            if (typeof skip !== "number" || typeof top !== "number") {
                return;
            }

            let posts = this;
            if (typeof filterConfig === "object") {
                posts = posts.filter((post) => {
                    if (filterConfig.hasOwnProperty("author")) {
                        if (filterConfig.author !== post.author)
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

            return posts.slice(skip, top + skip);
        },

        getPhotoPost(id) {
            if (typeof id !== "string" || id === "") {
                return;
            }

            return this.find((el) => {
                return el.id === id;
            });
        },

        validatePhotoPost(post) {
            if (typeof post !== "object") {
                return false;
            }
            if (typeof post.id !== "string" || post.id === "")
                return false;

            if (this.some((el) => el.id === post.id))
                return false;
            if (typeof post.description !== "string" || post.description === "")
                return false;
            if (!(post.createdAt instanceof Date))
                return false;
            if (typeof post.author !== "string" || post.author === "")
                return false;
            if (typeof post.photoLink !== "string" || post.photoLink === "")
                return false;
            if (typeof post.hashTags === "undefined" || !Array.isArray(post.hashTags))
                return false;
            if (typeof post.likes === "undefined" || !Array.isArray(post.hashTags))
                return false;

            return true;
        },

        validateEditPost(editPost) {
            if (typeof editPost !== "object") {
                return false;
            }

            if (editPost.hasOwnProperty("description")) {
                if (typeof editPost.description !== "string" || editPost.description === "")
                    return false;
            }
            if (editPost.hasOwnProperty("photoLink")) {
                if (typeof editPost.photoLink !== "string" || editPost.photoLink === "")
                    return false;
            }
            if (editPost.hasOwnProperty("hashTags")) {
                if (!Array.isArray(editPost.hashTags))
                    return false;
            }
            if (editPost.hasOwnProperty("likes")) {
                if (!Array.isArray(editPost.likes))
                    return false;
            }
            return true;

        },

        addPhotoPost(post) {
            if (!this.validatePhotoPost(post))
                return false;

            this.unshift(post);
            this.sort((post1, post2) => {
                return post2.createdAt - post1.createdAt;
            });
            return true;
        },

        editPhotoPost(id, editPost) {
            if (typeof id !== "string" || id === "" || typeof editPost !== "object") {
                return false;
            }

            let post = this.getPhotoPost(id);
            if (post) {

                if (!this.validateEditPost(editPost)) {
                    return false;
                }

                if (editPost.hasOwnProperty("description")) {
                    post.description = editPost.description;
                }
                if (editPost.hasOwnProperty("photoLink")) {
                    post.photoLink = editPost.photoLink;
                }
                if (editPost.hasOwnProperty("hashTags")) {
                    post.hashTags = editPost.hashTags;
                }
                if (editPost.hasOwnProperty("likes")) {
                    post.likes = editPost.likes;
                }
                return true;
            }

            return false;
        },

        removePhotoPost(id) {
            if (typeof id !== "string" || id === "") {
                return false;
            }

            let index = this.findIndex((el) => {
                return el.id === id;
            });

            if (~index) {
                this.splice(index, 1);
                return true;
            }

            return false;
        }
    }
})();

const photoPosts = [
    {
        id: '1',
        description: 'Hello',
        createdAt: new Date(2012, 10, 19, 23, 12),
        author: 'StefanoGrande',
        photoLink: 'pic/barokko.jpg',
        hashTags: ['#Photo4Photo', '#dinero', "#JSbetterThanVerstka", "#photogram"],
        likes: ['MartaCapelli', 'StefanoGrande', 'HTP']
    },
    {
        id: '2',
        description: 'Goobye',
        createdAt: new Date(2013, 10, 19, 23, 12),
        author: 'epam',
        photoLink: 'pic/barokko1.jpg',
        hashTags: ['#Photo4Photo', '#dinero'],
        likes: ['MartaCapelli', 'HTP']
    },
    {
        id: '3',
        description: 'Hello, how are u?',
        createdAt: new Date(2011, 10, 19, 23, 12),
        author: 'MartaCapelli',
        photoLink: 'pic/barokko2.jpg',
        hashTags: ['#dinero'],
        likes: ['RomPavel' ,'StefanoGrande']
    },
    {
        id: '4',
        description: 'Hello',
        createdAt: new Date(2012, 12, 31, 23, 12),
        author: 'MartaCapelli',
        photoLink: 'pic/barokko3.jpg',
        hashTags: ['#Photo4Photo'],
        likes: ['MartaCapelli', 'HTP']
    },
    {
        id: '5',
        description: 'You read all of descriotions?',
        createdAt: new Date(2012, 10, 19, 23, 12),
        author: 'junior',
        photoLink: 'pic/barokko4.jpg',
        hashTags: ['#dinero', '#cash'],
        likes: ['MartaCapelli', 'HTP']
    },
    {
        id: '6',
        description: 'Really?',
        createdAt: new Date(2005, 10, 19, 23, 12),
        author: 'RomPavel',
        photoLink: 'pic/exadel.jpg',
        hashTags: ['#Photo4Photo',],
        likes: [ 'StefanoGrande', 'HTP']
    },
    {
        id: '7',
        description: 'my respect',
        createdAt: new Date(2002, 10, 19, 23, 12),
        author: 'exadel',
        photoLink: 'pic/exadel1.jpg',
        hashTags: ['#Photo4Photo', '#dinero'],
        likes: [ 'StefanoGrande', 'HTP']
    },
    {
        id: '8',
        description: 'But it seems to me that this is not the right time management',
        createdAt: new Date(2011, 11, 19, 23, 12),
        author: 'RomPavel',
        photoLink: 'pic/exadel2.jpg',
        hashTags: ['#Photo4Photo', '#dinero', '#JSbetterThanVerstka'],
        likes: ['exadel', 'StefanoGrande']
    },
    {
        id: '9',
        description: 'valid post',
        createdAt: new Date(1999, 10, 10, 10, 10),
        author: "RomPavel",
        photoLink: 'pic/exadel.jpg',
        hashTags: ['#Photo4Photo', '#dinero', '#ECMAbetterThanVerstka'],
        likes: ['StefanoGrande']

    },
    {
        id: '10',
        description: 'valid post',
        createdAt: new Date(2015, 11, 18, 23, 12),
        author: 'BSU',
        photoLink: 'pic/exadel1.jpg',
        hashTags: ['#Photo4Photo', '#ECMAbetterThanVerstka'],
        likes: ['exadel']

    },
    {
        id: '11',
        description: 'Hello',
        createdAt: new Date(2012, 10, 19, 23, 12),
        author: 'StefanoGrande',
        photoLink: 'pic/barokko.jpg',
        hashTags: ['#Photo4Photo', '#dinero', "#JSbetterThanVerstka", "#photogram"],
        likes: ['MartaCapelli', 'StefanoGrande', 'HTP']
    },
    {
        id: '12',
        description: 'Goobye',
        createdAt: new Date(2013, 10, 19, 23, 12),
        author: 'epam',
        photoLink: 'pic/barokko1.jpg',
        hashTags: ['#Photo4Photo', '#dinero'],
        likes: ['MartaCapelli', 'HTP']
    },
    {
        id: '13',
        description: 'Hello, how are u?',
        createdAt: new Date(2011, 10, 19, 23, 12),
        author: 'MartaCapelli',
        photoLink: 'pic/barokko2.jpg',
        hashTags: ['#dinero'],
        likes: ['RomPavel' ,'StefanoGrande']
    },
    {
        id: '14',
        description: 'Hello',
        createdAt: new Date(2012, 12, 31, 23, 12),
        author: 'MartaCapelli',
        photoLink: 'pic/barokko3.jpg',
        hashTags: ['#Photo4Photo'],
        likes: ['MartaCapelli', 'HTP']
    },
    {
        id: '15',
        description: 'You read all of descriotions?',
        createdAt: new Date(2012, 10, 19, 23, 12),
        author: 'junior',
        photoLink: 'pic/barokko4.jpg',
        hashTags: ['#dinero', '#cash'],
        likes: ['MartaCapelli', 'HTP']
    },
    {
        id: '16',
        description: 'Really?',
        createdAt: new Date(2005, 10, 19, 23, 12),
        author: 'RomPavel',
        photoLink: 'pic/exadel.jpg',
        hashTags: ['#Photo4Photo',],
        likes: [ 'StefanoGrande', 'HTP']
    },
    {
        id: '17',
        description: 'my respect',
        createdAt: new Date(2002, 10, 19, 23, 12),
        author: 'exadel',
        photoLink: 'pic/exadel1.jpg',
        hashTags: ['#Photo4Photo', '#dinero'],
        likes: [ 'StefanoGrande', 'HTP']
    },
    {
        id: '18',
        description: 'But it seems to me that this is not the right time management',
        createdAt: new Date(2011, 11, 19, 23, 12),
        author: 'RomPavel',
        photoLink: 'pic/exadel2.jpg',
        hashTags: ['#Photo4Photo', '#dinero', '#JSbetterThanVerstka'],
        likes: ['exadel', 'StefanoGrande']
    },
    {
        id: '19',
        description: 'valid post',
        createdAt: new Date(1999, 10, 10, 10, 10),
        author: "RomPavel",
        photoLink: 'pic/exadel.jpg',
        hashTags: ['#Photo4Photo', '#dinero', '#ECMAbetterThanVerstka'],
        likes: ['StefanoGrande']

    },
    {
        id: '20',
        description: 'valid post',
        createdAt: new Date(2015, 11, 18, 23, 12),
        author: 'BSU',
        photoLink: 'pic/exadel1.jpg',
        hashTags: ['#Photo4Photo', '#ECMAbetterThanVerstka'],
        likes: ['exadel']
    }
]

let filterConfig = undefined;/* {
    fromDate: new Date(1800, 10, 16, 20, 12),
    toDate: new Date(2020, 10, 16, 20, 12),
    author: 'StefanoGrande',
    hashTags: ['#InCastle', '#HateWar'],
};*/


for (method in ServerModule) {
    photoPosts.__proto__[method] = ServerModule[method];
}
//tests
console.log("-getPhotoPosts-")
console.log("skip and top = default    :", photoPosts.getPhotoPosts());
console.log("skip = 6 and top = default:", photoPosts.getPhotoPosts(6));
console.log("skip = 1 and top = 3      :", photoPosts.getPhotoPosts(1, 3));
console.log("posts after filtering     :", photoPosts.getPhotoPosts(0, 10, filterConfig));
console.log("with invalid argument     :", photoPosts.getPhotoPosts("argument"))


console.log("\n-getPhotoPost-");
console.log("post with id 2       :", photoPosts.getPhotoPost('2'));
console.log("post with id 11      :", photoPosts.getPhotoPost('11'));
console.log("with invalid argument:", photoPosts.getPhotoPost(100));


console.log("\n-validatePhotoPost-");
console.log("Full post            :", photoPosts.validatePhotoPost({
    id: "4",
    description: 'Hello',
    createdAt: new Date(2012, 10, 19, 23, 12),
    author: 'RomPavel',
    photoLink: 'photogram1',
    hashTags: ['#Photo4Photo', '#dinero'],
    likes: ['exadel', 'epam', 'HTP']
}));
console.log("with invalid argument:", photoPosts.validatePhotoPost({
    id: "4",
    description: 'Hello',
    createdAt: 4,
    author: 'RomPavel',
    photoLink: 'photogram1',
    hashTags: ['#Photo4Photo', '#dinero'],
    likes: ['exadel', 'epam', 'HTP']
}));
console.log("with empty properties:", photoPosts.validatePhotoPost({
    id: "4",
    description: 'Hello',
    createdAt: new Date(2012, 10, 19, 23, 12),
    author: 'RomPavel',
    photoLink: 'photogram1',
    hashTags: [],
    likes: []
}));


console.log("\n-addPhotoPost-");
console.log("all posts:", photoPosts);
console.log("try to add invalid post:", photoPosts.addPhotoPost({
    id: "4",
    description: 'Hello',
    createdAt: 4
}));
console.log("all posts:", photoPosts);
console.log("try to add valid post  :", photoPosts.addPhotoPost({
    id: "1",
    description: 'Hello',
    createdAt: new Date(2012, 10, 19, 23, 12),
    author: 'RomPavel',
    photoLink: 'photogram1',
    hashTags: ['#Photo4Photo', '#dinero'],
    likes: ['exadel', 'epam', 'HTP']
}));
console.log("all posts:", photoPosts);

console.log("\n-editPhotoPost-");
console.log("post with id=3 before editing:", photoPosts.getPhotoPost('3'));
console.log("try to edit post with id=3   :", photoPosts.editPhotoPost('3', {
    photoLink: 'new.link',
    description: 'new description'
}));
console.log("post with id=3 after editing :", photoPosts.getPhotoPost('3'));
console.log("with invalid argument        :", photoPosts.editPhotoPost(''));


console.log("\n-removePhotoPost-");
console.log("with invalid argument:", photoPosts.removePhotoPost(''));
console.log("remove id=3 post     :", photoPosts.removePhotoPost('3'));
console.log("try to get id=3 post :", photoPosts.getPhotoPost('3'));



